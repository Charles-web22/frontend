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
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
    <main style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 1100, margin: '0 auto', background: '#fff', color: '#111' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111' }}>🌸 Spa Naija</h1>
        <div>
          <a href="/cart" style={{ marginRight: 15, color: '#111' }}>Cart</a>
          <a href="/vendor/dashboard" style={{ color: '#111' }}>Vendor</a>
        </div>
      </header>
      <p style={{ color: '#555', marginTop: 8 }}>Best spa & beauty marketplace in Nigeria. Book services, buy products.</p>
      <div style={{ background: '#fef3c7', padding: 15, borderRadius: 12, margin: '20px 0', color: '#111' }}>
        <b>🔥 Flash Sale:</b> 15% off all massages today!
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '20px 0', color: '#111' }}>Products ({products.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 20 }}>
        {products.map((p: any) => (
          <a key={p.id} href={`/products/${p.id}`} style={{ border: '1px solid #eee', borderRadius: 12, padding: 15, textDecoration: 'none', color: '#111', background: '#fff', display: 'block' }}>
            <h3 style={{ fontWeight: 700, color: '#111' }}>{p.name}</h3>
            <p style={{ color: '#666', fontSize: 14 }}>{p.description?.slice(0, 80)}</p>
            <p style={{ fontWeight: 800, marginTop: 10, color: '#111' }}>₦{Number(p.price).toLocaleString()}</p>
            <span style={{ background: p.is_service ? '#dbeafe' : '#dcfce7', color: '#111', padding: '4px 8px', borderRadius: 20, fontSize: 12 }}>
              {p.is_service ? `💆 Service - ${p.duration_minutes} mins` : '🛍️ Product'}
            </span>
            <br /><br />
            <span style={{ background: '#111', color: '#fff', padding: '8px 14px', borderRadius: 8, display: 'inline-block' }}>View Details →</span>
          </a>
        ))}
      </div>
    </main>
    </div>
  );
}
