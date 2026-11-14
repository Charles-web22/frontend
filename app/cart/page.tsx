// FIXED Cart - with Suspense for Next.js 15
'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CartContent() {
  const [cart, setCart] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const addId = searchParams.get('add');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('spa_cart') || '[]');
    setCart(saved);
    if (addId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${addId}`)
        .then(r => r.json())
        .then(p => {
          if (p?.name && !saved.find((x: any) => x.id === p.id)) {
            const next = [...saved, { ...p, qty: 1 }];
            setCart(next);
            localStorage.setItem('spa_cart', JSON.stringify(next));
          }
        });
    }
  }, [addId]);

  const total = cart.reduce((sum, x) => sum + Number(x.price) * x.qty, 0);
  const remove = (id: number) => {
    const next = cart.filter(x => x.id !== id);
    setCart(next);
    localStorage.setItem('spa_cart', JSON.stringify(next));
  };

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <a href="/">← Back to Home</a>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 15 }}>🛒 Your Cart ({cart.length})</h1>
      {
