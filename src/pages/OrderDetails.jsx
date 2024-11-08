"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const handleTrack = () => {
    if (!id) {
      alert("Please enter a valid Order ID.");
      return;
    }
    navigate(`/order-details/${id}`);
  };

  return (
    <div className="px-2 flex flex-col items-center min-h-nav-full justify-center">
      <h1>Track Order</h1>
      <p>
        Enter the order ID to track the status of your order. You can find the
        order ID in the confirmation email.
      </p>
      <div className="w-full max-w-md mx-auto flex flex-col gap-2 mt-10">
        <label htmlFor="order-id" className="sr-only">
          Order ID
        </label>
        <Input
          id="order-id"
          placeholder="Order ID goes here..."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Button onClick={handleTrack}>Track</Button>
      </div>
    </div>
  );
};

export default OrderDetails;
