async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { cache: 'no-store' });
    return await res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p?.name) return { title: 'Product Not Found - Spa Naija' };
  return {
    title: `${p.name} - ₦${Number(p.price).toLocaleString()} | Spa Naija`,
    description: p.description || p.name,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p?.name) return <div style={{ padding: 40, background: '#fff', color: '#111', minHeight: '100vh' }}><a href="/">← Back</a><h1>Product not found</h1></div>;
  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
    <main style={{ padding: 20, maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <a href="/" style={{ color: '#111' }}>← Back to Home</a>
      <h1 style={{ fontSize: 30, fontWeight: 800, marginTop: 15 }}>{p.name}</h1>
      <p style={{ color: '#666' }}>By {p.vendor?.business_name || 'Spa Naija Vendor'} • {p.category}</p>
      <p style={{ marginTop: 15 }}>{p.description}</p>
      <p style={{ fontSize: 28, fontWeight: 800, marginTop: 20 }}>₦{Number(p.price).toLocaleString()}</p>
      {p.sale_price && <p style={{ color: 'green' }}>Sale: ₦{Number(p.sale_price).toLocaleString()}</p>}
      {p.is_service ? (
        <p>💆 Service • Duration: {p.duration_minutes} mins • Book this service</p>
      ) : (
        <p>🛍️ Product • Stock: {p.stock} available</p>
      )}
      <div style={{ marginTop: 25, display: 'flex', gap: 10 }}>
        <a href={`/cart?add=${p.id}`} style={{ background: '#111', color: '#fff', padding: '12px 20px', borderRadius: 8, textDecoration: 'none' }}>Add to Cart 🛒</a>
        <a href={`https://wa.me/2348012345678?text=Hi, I want to book ${p.name} - ₦${p.price}`} target="_blank" style={{ background: '#25D366', color: '#fff', padding: '12px 20px', borderRadius: 8, textDecoration: 'none' }}>WhatsApp Order 💬</a>
      </div>
      <div style={{ marginTop: 30, background: '#f9fafb', padding: 15, borderRadius: 12 }}>
        <b>Vendor:</b> {p.vendor?.business_name}<br />
        <b>City:</b> {p.vendor?.city || 'Lagos'}<br />
        <b>Phone:</b> {p.vendor?.phone || 'Contact via WhatsApp'}
      </div>
    </main>
    </div>
  );
}
