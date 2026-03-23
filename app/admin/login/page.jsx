"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/admin-login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        // BETTER: The backend should ideally set an HttpOnly Cookie here.
        // If you MUST use localStorage for now, at least clear old sessions:
        localStorage.clear();

        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('loginTime', Date.now().toString());

        // Avoid storing the Refresh Token in localStorage if possible.
        router.push('/admin/');
      } else {
        // SECURITY TIP: Don't tell the user IF the username was right but password wrong.
        // Just say "Invalid Credentials" to prevent username enumeration.
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError('Connection to server failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background Decorative Elements */}
      <div className={styles.bgOrb}></div>

      <div className={styles.container}>
        {/* Left: Branding & Vision */}
        <div className={styles.brandingSide}>
          <div className={styles.logoContainer}>
            <div className={styles.logoRing}></div>
            <img src="/logo.png" alt="Deegenex" className={styles.logo} />
          </div>

          <div className={styles.brandText}>
            <h1 className={styles.companyName}>DEEGENEX</h1>
            <div className={styles.divider}></div>
            <p className={styles.visionText}>Intelligence for a better future</p>
          </div>

          <div className={styles.versionTag}>SYSTEM VERSION // 2.0.4</div>
        </div>

        {/* Right: Modern Auth Terminal */}
        <div className={styles.formSide}>
          <form className={styles.loginCard} onSubmit={handleLogin}>
            <div className={styles.formHeader}>
              <h2>System Access</h2>
              <p>Secure administrative gateway</p>
            </div>

            <div className={styles.inputField}>
              <input type="text" name="username" required placeholder=" " onChange={handleChange} suppressHydrationWarning/>
              <label>Username</label>
              <div className={styles.inputBar}></div>
            </div>

            <div className={styles.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder=" "
                onChange={handleChange}
                suppressHydrationWarning
              />
              <label>Security Key</label>
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div className={styles.inputBar}></div>
            </div>
            <button type="submit" className={styles.loginBtn} disabled={loading}>
  {loading ? (
    <div className={styles.spinner}></div>
  ) : (
    <>
      <span className={styles.btnText}>INITIALIZE SESSION</span>
      <span className={styles.btnArrow}>→</span>
    </>
  )}
</button>

            <div className={styles.footerNote}>
              &copy; {year} Deegenex Intelligence Systems. All rights reserved.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}