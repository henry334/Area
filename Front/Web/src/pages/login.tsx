import React, { useState } from 'react';
import GoogleIcon from '@/components/svg/GoogleIcon';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useCookies } from 'react-cookie';

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cookies, setCookie] = useCookies(['authorization']);

    const handleLogin = async () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.Bearer) {
                setCookie('authorization', 'Bearer ' + data.Bearer, { path: '/' });
            }
            router.push('/dashboard/services');
        } else {
            window.alert('Incorrect email or password. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-bl from-cyan-400 to-blue-700 p-4">
            <h1 className="text-5xl text-white mb-8 font-extrabold">Login</h1>
            <div className="flex flex-col items-center w-full md:w-1/4 text-center">
                <input
                    type="text"
                    placeholder="Email"
                    className="mb-3 p-2 text-lg text-center text-white bg-transparent border-white border-b-2 w-8/12 focus:outline-none focus:border-black transition duration-300 placeholder:text-white"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="Password"
                    placeholder="password"
                    className="mb-6 p-2 text-lg text-center text-white bg-transparent border-b-2 border-white w-8/12 focus:outline-none focus:border-black transition duration-300 placeholder:text-white"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    onClick={handleLogin}
                    className=" bg-neutral-900 px-8 py-2 mb-1 rounded-full hover:bg-neutral-800 w-8/12 h-12 text-xl font-bold justify-start text-white text-lg text-center" // or you can omit this line
                >
                    Login
                </button>
                <Link href="/register" className="text-white text-lg underline mb-8">
                    Don't have an account? Register here.
                </Link>

                <button
                    className=" bg-white px-6 m-2 rounded-full hover:bg-neutral-200 w-8/12 h-12 text-xl font-bold flex items-center justify-start" // or you can omit this line
                >
                    <div className='w-6 mr-6 m-1 flex-shrink-0'>
                        <GoogleIcon />
                    </div>
                    <p className='text-neutral-900 m-1 text-lg flex-grow'>
                        Continue with Google
                    </p>
                </button>

            </div>
        </div>

    );
};

export default Login;
