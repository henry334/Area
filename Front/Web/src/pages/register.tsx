import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useCookies } from 'react-cookie';

const Register: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [cookies, setCookie] = useCookies(['authorization']);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const requestBody = {
            email,
            username,
            password,
        };
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.Bearer) {
                    setCookie('authorization', 'Bearer ' + data.Bearer, { path: '/' });
                }
                router.push('/dashboard/services');
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Registration failed!");
            }
        } catch (error) {
            alert("An error occurred while registering.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-bl from-cyan-400 to-blue-700 p-4">
            <h1 className="text-5xl text-white mb-4 font-extrabold">Register</h1>
            <div className="flex flex-col items-center w-full md:w-1/4 text-center">
                <input
                    type="text"
                    placeholder="Email"
                    className="mb-3 p-2 text-lg text-center text-white bg-transparent border-white border-b-2 w-8/12 focus:outline-none focus:border-black transition duration-300 placeholder:text-white"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="mb-3 p-2 text-lg text-center text-white bg-transparent border-white border-b-2 w-8/12 focus:outline-none focus:border-black transition duration-300 placeholder:text-white"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-5 p-2 text-lg text-center text-white bg-transparent border-b-2 border-white w-8/12 focus:outline-none focus:border-black transition duration-300 placeholder:text-white"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="mb-5 p-2 text-lg text-center text-white bg-transparent border-b-2 border-white w-8/12 focus:outline-none focus:border-black transition duration-300 placeholder:text-white"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button
                    onClick={handleRegister}
                    className=" bg-neutral-900 px-8 py-2 m-2 rounded-full hover:bg-neutral-800 w-8/12 h-12 text-xl font-bold justify-start text-white text-lg text-center" // or you can omit this line
                >
                    Register
                </button>
                <Link href="/login" className="text-white text-lg underline mb-8">
                    Already have an account? Login here.
                </Link>
            </div>
        </div>

    );
};

export default Register;
