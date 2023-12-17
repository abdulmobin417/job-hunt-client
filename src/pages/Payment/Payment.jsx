import { loadStripe } from "@stripe/stripe-js";
import SubTitle from "../../components/SubTitle/SubTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const stripPromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  return (
    <div>
      <div className="my-16">
        <SubTitle title={"Payment"}></SubTitle>
      </div>
      <Elements stripe={stripPromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;