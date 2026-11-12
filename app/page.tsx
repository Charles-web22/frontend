async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: 'no-store' });
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>🌸 Spa Naija</h1>
        <div>
          <a href="/cart" style={{ marginRight: 15 }}>Cart</a>
          <a href="/vendor/dashboard">Vendor</a>
        </div>
      </header>
      <p style={{ color: '#666', marginTop: 8 }}>Best spa & beauty marketplace in Nigeria. Book services, buy products.</p>
      <div style={{ background: '#fef3c7', padding: 15, borderRadius: 12, margin: '20px 0' }}>
        <b>🔥 Flash Sale:</b> 15% off all massages today!
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '20px 0' }}>Products ({products.length})</h2>
      {products.length === 0 && <p>No products yet. Check API: https://piearn.com/api/v1/products</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 20 }}>
        {products.map((p: any) => (
          <a key={p.id} href={`/products/${p.id}`} style={{ border: '1px solid #eee', borderRadius: 12, padding: 15, textDecoration: 'none', color: '#111' }}>
            <h3 style={{ fontWeight: 700 }}>{p.name}</h3>
            <p style={{ color: '#666', fontSize: 14 }}>{p.description?.slice(0, 80)}</p>
            <p style={{ fontWeight: 800, marginTop: 10 }}>₦{Number(p.price).toLocaleString()}</p>
            <span style={{ background: p.is_service ? '#dbeafe' : '#dcfce7', padding: '4px 8px', borderRadius: 20, fontSize: 12 }}>
              {p.is_service ? `💆 Service - ${p.duration_minutes} mins` : '🛍️ Product'}
            </span>
            <br /><br />
            <span style={{ background: '#111', color: '#fff', padding: '8px 14px', borderRadius: 8 }}>View Details →</span>
          </a>
        ))}
      </div>
      <footer style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 15, color: '#888', fontSize: 13 }}>
        Spa Naija • Backend: piearn.com • Frontend: Vercel • Paystack + Vendor Payouts 15%
      </footer>
    </main>
  );
}
