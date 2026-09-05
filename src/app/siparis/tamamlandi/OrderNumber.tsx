'use client';

import { useEffect, useState } from 'react';

export function OrderNumber() {
  const [orderNo, setOrderNo] = useState<string | null>(null);

  useEffect(() => {
    setOrderNo(`NA-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  return <strong className="text-purple-800">{orderNo ?? '—'}</strong>;
}
