import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const CheckoutForm = () => {
  const { user, quizPackage } = useAuth();
  const { price, category } = quizPackage;
  const totalPrice = price + parseInt((price * 2) / 100);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cartError, setCartError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCartError(error.message);
    } else {
      setCartError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("[error]", confirmError);
      setCartError(confirmError.message);
    } else {
      setProcessing(false);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        //save payment info to database
        const payment = {
          email: user?.email,
          price: parseFloat(totalPrice),
          date: new Date(),
          transactionId: paymentIntent.id,
          categoryType: category,
          status: "pending",
        };
        console.log(payment);
        axiosSecure.post("/payments", payment).then((res) => {
          if (res.data.insertedId) {
            toast.success("Payment successful");
            navigate("/dashboard/paymentHistory");
          }
        });
      }
    }
  };

  return (
    <div className="mx-2 sm:mx-6 md:mx-12 lg:mx-24 items-center mb-32">
      <div className="flex justify-center mb-12">
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${price}.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Govt. Vat</p>
            <p className="text-gray-700">${parseInt((price * 2) / 100)}.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${totalPrice}.00 USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="w-full mx-auto">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="my-6">
            {cartError && (
              <span className="text-red-600 text-center">{cartError}</span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={!stripe || !clientSecret || processing}
              className="btn hover:bg-gray-500 text-white text-xl w-3/4 sm:w-1/3 mx-auto mt-4"
              style={{
                background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
              }}
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
