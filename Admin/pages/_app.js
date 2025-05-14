// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Check the import path
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const user = useAuth();
  const router = useRouter();

  // Redirect logic for initial page load
  useEffect(() => {
    // If user is logged in, redirect to home page
    if (user) {
      router.push('/admin');
    } else {
      // If user is not logged in, redirect to login page
      router.push('/login');
    }
  }, [user]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
