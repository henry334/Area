import React from 'react';
import { useRouter } from 'next/router'
import Logo from '../components/svg/Logo';
import { useCookies } from 'react-cookie';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['authorization']);

  const handleGetStarted = () => {
    if (cookies.authorization) {
      router.push('/dashboard/services');
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <section className="p-10 flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-cyan-400 to-blue-700">
        <div className="w-60 mb-3">
          <Logo color='white' />
        </div>
        <h1 className="text-9xl text-white mb-6 font-extrabold">TITS</h1>
        <h1 className="text-5xl font-bold mb-4 text-center text-white">
          Tasks Integrations<br />& Technologies Systems
        </h1>
        <div className="flex justify-center w-64 h-16">
          <button
            className="bg-white text-black px-8 py-2 mt-14 rounded-full hover:bg-gray-100 hover:text-black w-full h-full text-xl font-bold"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
