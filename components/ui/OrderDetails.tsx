// app/OrderDetails.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

const OrderDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the order ID from the URL
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/${id}`);
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Order Details</h1>
      {order && (
        <div>
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total}</p>
          <p>Payment Method: {order.payment}</p>
          <h3>Shipping Information</h3>
          <p>Address: {order.address}</p>
          <p>Phone: {order.phone}</p>
          <p>Pincode: {order.pincode}</p>
          <h3>Products</h3>
          <ul>
            {order.products.map((item) => (
              <li key={item._id}>
                <h4>{item.product.name}</h4>
                <img src={item.product.image} alt={item.product.name} />
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
