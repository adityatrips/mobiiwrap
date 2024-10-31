// app/orders/[id]/page.tsx
import React from 'react';

import OrderDetails from '@/components/ui/OrderDetails';
const OrderPage: React.FC = () => {
  return (
    <div>
      <OrderDetails />
    </div>
  );
};

export default OrderPage;
