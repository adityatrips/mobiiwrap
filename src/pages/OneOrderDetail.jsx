"use client";

// app/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import CustomLoading from "@/components/Loader";
import { useParams } from "react-router-dom";
import { useGetOrder } from "@/services";

const OneOrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const getUserCart = useGetOrder(id);

  if (getUserCart.isPending) return <CustomLoading />;
  if (getUserCart.isError)
    return (
      <div className="min-h-screen flex flex-col mx-auto container text-center justify-center items-center">
        <p>Error: {error}</p>
        <button
          onClick={handleRetry}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="flex flex-col min-h-nav-full mt-20">
      <h1 className="text-3xl font-bold text-center mb-4">Order Details</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <div className="shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Order ID: {getUserCart.data.data._id}
            </h2>
            <p>
              <strong>Status:</strong> {getUserCart.data.data.status}
            </p>
            <p>
              <strong>Total:</strong> ₹{getUserCart.data.data.total}
            </p>
            <p>
              <strong>Payment Method:</strong> {getUserCart.data.data.payment}
            </p>
            <h3 className="text-xl font-semibold mt-4">Shipping Information</h3>
            <p>
              <strong>Address:</strong> {getUserCart.data.data.address}
            </p>
            <p>
              <strong>Phone:</strong> {getUserCart.data.data.phone}
            </p>
            <p>
              <strong>Pincode:</strong> {getUserCart.data.data.pincode}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getUserCart.data.data.products.map((item) => (
              <div key={item._id} className="border w-full rounded-lg p-4">
                <h3 className="font-semibold mb-4">{item.product.name}</h3>
                <img
                  className="w-full h-auto object-contain mb-5"
                  src={item.product.image}
                  alt={`Image of ${item.product.name}`}
                />
                <p>
                  <strong>Price:</strong> ₹{item.product.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneOrderDetail;
