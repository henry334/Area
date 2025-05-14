import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, me, setMe } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError(null);
      // DEVELOPEMENT
      if (process.env.NODE_ENV === 'development' && email === 'admin' && password === 'password') {
        console.log('DEVELOPMENT LOGIN');
        setMe({
          username: 'admin',
          authority: 'admin',
        });
        login('dummy_token');
        router.push('/admin');
        //
      } else {
        const response = await api.login(email, password);
        const token = response.Bearer;
        const userResponse = await api.getMe(token);
        setMe(userResponse);

        login(token);
        router.push('/admin');

        // if (me && me.authority === 'admin') {
        //   login(token);
        //   router.push('/admin');
        // } else {
        //   setError('You do not have sufficient privileges to access the admin panel.');
        //   setPassword('');
        // }
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid email or password. Please try again.');
      setPassword('')
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && (email && password)) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full" onKeyDown={handleKeyPress}>
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
