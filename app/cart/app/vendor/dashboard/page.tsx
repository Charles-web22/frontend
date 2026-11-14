'use client';
import { useEffect, useState } from 'react';

export default function VendorDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'massage' });

  useEffect(() => {
    const token = localStorage.getItem('spa_token');
    if (!token) { window.location.href = '/login'; return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor/products`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setProducts(d.data || []));
  }, []);

  const create = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('spa_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, price: Number(form.price), is_service: form.category === 'massage' }),
    });
    if (res.ok) { alert('Product added!'); window.location.reload(); } else alert('Failed - are you logged in as vendor?');
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
    <main style={{ padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Vendor Dashboard</h1>
      <h2 style={{ marginTop: 20 }}>Add New Product / Service</h2>
      <form onSubmit={create} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 }}>
        <input placeholder="Product name - e.g. Hot Stone Massage" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        <input placeholder="Price - e.g. 25000" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        <button style={{ background: '#111', color: '#fff', padding: 12, borderRadius: 8, border: 'none' }}>Add Product →</button>
      </form>
      <h2 style={{ marginTop: 30 }}>My Products ({products.length})</h2>
      {products.map((p: any) => <div key={p.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, marginTop: 10 }}>{p.name} - ₦{Number(p.price).toLocaleString()}</div>)}
    </main>
    </div>
  );
}
