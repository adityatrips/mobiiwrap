'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OrderDetails = () => {
  const router = useRouter();
  const [id, setId] = useState('');

  return (
    <div>
      <Input value={id} onChange={(e) => setId(e.target.value)} />
      <Button
        onClick={() => {
          router.push(`/order-details/${id}`);
        }}
      >
        Track Order
      </Button>
    </div>
  );
};

export default OrderDetails;
