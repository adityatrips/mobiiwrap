"use client";

// app/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomLoading from "@/shared/CustomLoading";

interface Product {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  user: string;
  products: Product[];
  address: string;
  phone: string;
  pincode: string;
  status: string;
  payment: string;
  total: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

const OrderPage = ({ params: { id } }: OrderDetailsPageProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      const data: Order = await response.json();
      setOrder(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchOrder();
  };

  if (loading) return <CustomLoading />;
  if (error)
    return (
      <div className="text-center">
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
    <div className="flex flex-col container mx-auto px-2 mt-20 ">
      <h1 className="text-3xl font-bold text-center mb-4">Order Details</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          {order && (
            <div className="shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Order ID: {order?._id}
              </h2>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.payment}
              </p>
              <h3 className="text-xl font-semibold mt-4">
                Shipping Information
              </h3>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Pincode:</strong> {order.pincode}
              </p>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order?.products.map((item) => (
              <div key={item._id} className="border w-full rounded-lg p-4">
                <h3 className="font-semibold mb-4">{item.product.name}</h3>
                <Image
                  height={250}
                  width={250}
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

export default OrderPage;
