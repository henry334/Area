import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Header = () => {
  const { logout, me } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Logout the user by clearing the authentication token
    router.push('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
      <div>{me && <span>Hi, {me.username}!</span>}</div>
      <button onClick={handleLogout} className="hover:underline focus:outline-none">
        Logout
      </button>
    </div>
  );
};

export default Header;
