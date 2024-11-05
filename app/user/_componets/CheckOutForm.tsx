/* eslint-disable react/prop-types */
"use clent";
import { useAuth } from "@/hook/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const elements = useElements();
  const amount = 20;
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (amount) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/pay/create-payment-intent`,
          { amount: amount }
        )
        .then((res) => {
          console.log("Payment Intent Response:", res.data); // Log the response
          if (res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            console.error("Client secret not found");
          }
        });
    }
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error?.message) {
      setError(error?.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: auth?.user?.email || "anonymous",
            name: auth?.user?.profile?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          amount: amount,
          transactionId: paymentIntent.id,
          userId: auth?.user?._id,
        };

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/pay/subscription`,
          payment
        );
        console.log("payment saved", res.data);

        if (res.data?.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for subscribing",
            showConfirmButton: false,
            timer: 1500,
          });
          if (res?.data && auth) {
            setAuth({ ...auth, user: res?.data?.data?.updatedUser });
          }
          router.push("/user/profile");
        }
      }
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4 text-black">
        Checkout
      </h2>
      <h2 className="text-lg font-bold text-center mb-4 text-black">
        20 USD monthly
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 border border-gray-300 rounded-md p-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  backgroundColor: "#f9fafb", // Light background color
                  padding: "10px", // Padding around the element

                  "::placeholder": {
                    color: "#9ca3af", // Placeholder color
                  },
                },
                invalid: {
                  color: "#9e2146", // Error color
                },
              },
            }}
          />
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition my-4"
          type="submit"
        >
          Pay
        </button>
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-center mt-2">
            Your transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
