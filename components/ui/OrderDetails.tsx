'use client';

// app/OrderDetails.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

const OrderDetails = ({ orderId }: { orderId: string }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/${orderId}`);
          if (!response.ok) {
            throw new Error('Order not found');
          }
          const data: Order = await response.json();
          setOrder(data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message); // Use the message from the Error object
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center mb-4'>Order Details</h1>
      {order && (
        <div className=' shadow-md rounded-lg p-6'>
          <h2 className='text-2xl font-semibold mb-2'>Order ID: {order._id}</h2>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.payment}
          </p>
          <h3 className='text-xl font-semibold mt-4'>Shipping Information</h3>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>
          <p>
            <strong>Pincode:</strong> {order.pincode}
          </p>

          <h3 className='text-xl font-semibold mt-4'>Products</h3>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {order.products.map((item) => (
              <li key={item._id} className='border rounded-lg p-4'>
                <h4 className='font-semibold'>{item.product.name}</h4>
                <Image
                  height={200}
                  width={200}
                  className='w-full h-auto rounded-md'
                  src={item.product.image}
                  alt={item.product.name}
                />
                <p className='text-gray-700'>
                  <strong>Price:</strong> ₹{item.product.price}
                </p>
                <p className='text-gray-700'>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
