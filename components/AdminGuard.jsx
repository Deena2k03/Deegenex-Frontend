"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const loginTime = localStorage.getItem('loginTime');
      const THIRTY_MINUTES = 30 * 60 * 1000;

      // 1. Check if token exists
      if (!token) {
        router.push('/admin/login');
        return;
      }

      // 2. Check 30-minute session timeout
      if (loginTime && (Date.now() - Number(loginTime) > THIRTY_MINUTES)) {
        localStorage.clear();
        router.push('/admin/login');
        return;
      }

      setAuthorized(true);
    };

    checkAuth();
    
    // Check session every minute while the user is on the page
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, [router]);

  if (!authorized) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={40} color="#0b5cff" />
      </div>
    );
  }

  return <>{children}</>;
}