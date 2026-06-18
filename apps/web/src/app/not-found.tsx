import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: '#0A0A0F',
          color: '#F8F8FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏚️</div>
          <h1
            style={{
              fontSize: '6rem',
              fontWeight: '900',
              margin: '0 0 0.5rem',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </h1>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
            }}
          >
            🔍 Page Not Found
          </h2>
          <p
            style={{
              color: 'rgba(248,248,255,0.5)',
              marginBottom: '2rem',
              maxWidth: '400px',
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#0A0A0F',
              padding: '0.75rem 1.75rem',
              borderRadius: '0.75rem',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            🏠 Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
