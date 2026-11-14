// Cart Page - SPA (interactive, no SEO needed)
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const addId = searchParams.get('add');

  // Load cart from browser + add new product if ?add=2
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
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
    <main style={{ padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <a href="/">← Back to Home</a>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 15 }}>🛒 Your Cart ({cart.length})</h1>
      {cart.length === 0 ? <p>Your cart is empty. <a href="/">Browse products →</a></p> : (
        <>
          {cart.map((item: any) => (
            <div key={item.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 15, marginTop: 15, display: 'flex', justifyContent: 'space-between' }}>
              <div><b>{item.name}</b><br /><span style={{ color: '#666' }}>₦{Number(item.price).toLocaleString()} x {item.qty}</span></div>
              <button onClick={() => remove(item.id)} style={{ background: '#fee', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>Remove ✕</button>
            </div>
          ))}
          <h2 style={{ marginTop: 20 }}>Total: ₦{total.toLocaleString()}</h2>
          <p style={{ color: '#666' }}>Platform fee (15%) included in vendor payout. You pay total only.</p>
          <a href="/checkout" style={{ background: '#111', color: '#fff', padding: '12px 20px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', marginTop: 10 }}>Proceed to Checkout →</a>
        </>
      )}
    </main>
    </div>
  );
}
