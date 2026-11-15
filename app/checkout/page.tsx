'use client';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('spa_cart') || '[]'));
  }, []);

  const total = cart.reduce((s: any, x: any) => s + Number(x.price) * x.qty, 0);

  const placeOrder = () => {
    if (!name || !phone) { alert('Please enter your name and phone'); return; }
    const msg = `Hi Spa Naija! I want to order:%0A${cart.map((x: any) => `${x.name} - ₦${x.price} x ${x.qty}`).join('%0A')}%0A%0ATotal: ₦${total}%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;
    localStorage.removeItem('spa_cart');
    window.open(`https://wa.me/2348012345678?text=${msg}`, '_blank');
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111', padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <a href="/cart">← Back to Cart</a>
      <h1 style={{ marginTop: 15 }}>Checkout</h1>
      <p>Items: {cart.length} • Total: <b>₦{total.toLocaleString()}</b></p>
      {cart.map((x: any) => <div key={x.id} style={{ border: '1px solid #eee', padding: 10, borderRadius: 8, marginTop: 10 }}>{x.name} - ₦{Number(x.price).toLocaleString()} x {x.qty}</div>)}
      <h2 style={{ marginTop: 25 }}>Your Details</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <input placeholder="Phone - e.g. 08012345678" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <input placeholder="Delivery Address / Location" value={address} onChange={e => setAddress(e.target.value)} style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <button onClick={placeOrder} style={{ background: '#25D366', color: '#fff', padding: 14, borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Place Order via WhatsApp 💬</button>
        <p style={{ color: '#666', fontSize: 14 }}>Paystack payment will come next - for now WhatsApp order lets you test full flow without Paystack keys.</p>
      </div>
    </div>
  );
}
