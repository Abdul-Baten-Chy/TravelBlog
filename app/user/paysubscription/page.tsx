"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../_componets/CheckOutForm";

export default function Subscription() {
  const stripePromise = loadStripe(
    "pk_test_51OupxERuBpildU6c2D3EMa6qdNk7DJ6mr1M1VXjTzXFt4hY4U2sncwmPLb1OqM0tckksvnYdXQcAz5nR5r7mubDY00IxgkYrym"
  );
  return (
    <div className="bg-white w-[400px]">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
