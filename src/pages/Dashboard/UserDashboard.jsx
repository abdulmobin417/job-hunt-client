import { useQuery } from "@tanstack/react-query";
import SubTitle from "../../components/SubTitle/SubTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments?email=${user?.email}`);
      return response.data;
    },
  });

  return (
    <div>
      <div className="my-16">
        <SubTitle title={"Payment History"}></SubTitle>
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center font-body text-3xl font-bold mb-9">
          <h3>Total Payments: {payments.length}</h3>
        </div>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>Serial</th>
                <th>Email</th>
                <th className="py-6">Category</th>
                <th>Total Price</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div>
                      <p className="text-2xl py-4">You have no payment history</p>
                      <button className="btn bg-[#d1a054] text-white hover:bg-gray-600">
                        <Link to="/">Go to Home Page</Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index+1}</td>
                    <td>{item.email}</td>
                    <td className="py-6">{item.categoryType}</td>
                    <td>${item.price}.00</td>
                    <td>{format(new Date(item.date), "EEEE, MMMM d, yyyy")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;