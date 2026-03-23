// Frontend/app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={styles.container}>
      {/* Decorative Light Blue Shapes */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.title}>Oops! Page Not Found</h2>
        <p style={styles.description}>
          The link you followed might be broken, or the page may have been removed. 
          Let's get you back on track.
        </p>
        <div style={styles.buttonGroup}>
          <Link href="/" style={styles.primaryButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffffff', // Pure white background
    color: '#1e293b', // Dark slate for text
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    zIndex: 5,
    padding: '20px',
  },
  errorCode: {
    fontSize: 'clamp(8rem, 20vw, 12rem)',
    fontWeight: '900',
    margin: '0',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Blue Gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1',
    filter: 'drop-shadow(0px 4px 10px rgba(37, 99, 235, 0.1))',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0.5rem 0',
    color: '#0f172a',
  },
  description: {
    fontSize: '1.2rem',
    color: '#64748b', // Muted grey-blue
    maxWidth: '500px',
    margin: '0 auto 2.5rem auto',
    lineHeight: '1.6',
  },
  primaryButton: {
    display: 'inline-block',
    padding: '14px 32px',
    backgroundColor: '#2563eb', // Solid Brand Blue
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
  },
  // Decorative soft blue blobs for the background
  blob1: {
    position: 'absolute',
    top: '-10%',
    left: '-5%',
    width: '40vw',
    height: '40vw',
    backgroundColor: '#eff6ff',
    borderRadius: '50%',
    filter: 'blur(80px)',
    zIndex: 1,
  },
  blob2: {
    position: 'absolute',
    bottom: '-10%',
    right: '-5%',
    width: '30vw',
    height: '30vw',
    backgroundColor: '#dbeafe',
    borderRadius: '50%',
    filter: 'blur(60px)',
    zIndex: 1,
  }
};