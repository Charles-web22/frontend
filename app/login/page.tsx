'use client';
import { useState } from 'react';
export default function Login() {
  const [email, setEmail] = useState('vendor@spanaija.com');
  const [password, setPassword] = useState('vendor123');
  const login = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (data.token) { localStorage.setItem('spa_token', data.token); localStorage.setItem('spa_user', JSON.stringify(data.user)); alert('Logged in!'); window.location.href = '/vendor/dashboard'; }
    else alert('Login failed: ' + (data.message || 'Check email/password'));
  };
  return (
    <main style={{ padding: 40, maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif', background: '#fff', minHeight: '100vh', color: '#111' }}>
      <h1>Login</h1>
      <p style={{ color: '#666' }}>Demo Vendor: vendor@spanaija.com / vendor123</p>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <button style={{ background: '#111', color: '#fff', padding: 12, borderRadius: 8 }}>Login →</button>
      </form>
    </main>
  );
}
