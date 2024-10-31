'use client';

// app/orders/[id]/page.tsx
import React from 'react';

import OrderDetails from '@/components/ui/OrderDetails';
import { useRouter } from 'next/navigation';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}
const OrderPage = ({ params: { id } }: OrderDetailsPageProps) => {
  return (
    <div>
      <OrderDetails orderId={id} />
    </div>
  );
};

export default OrderPage;
