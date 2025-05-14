import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useBearerFetch } from '@/Utils/bearerFetch';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

interface ProfileData {
    username: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
    const router = useRouter();
    const bearerFetch = useBearerFetch();

    useEffect(() => {
        const apiUrl = '/auth/me';

        bearerFetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
                setUsername(data.username);
                setEmail(data.email);
                setPassword(data.password);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleLogout = async () => {
        const logoutApiUrl = '/auth/logout';
        try {
            await bearerFetch(logoutApiUrl, {
                method: 'POST',
            });
            setCookie('authorization', '', { path: '/' });
            
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangePassword = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("New password and confirmation password do not match");
            return;
        }
        const changePasswordApiUrl = '/auth/changepswd';
        try {
            const response = await bearerFetch(changePasswordApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldpassword: oldPassword, newpassword: newPassword }),
            });
            if (!response.ok) {
                alert("Current password is incorrect");
                return;
            }
            setIsChangePasswordPopupOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white h-screen text-black">
            <Navbar />
            <div className="flex flex-col justify-center items-center h-3/4 text-center">
                <div className="w-2/12">
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-4xl" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-4xl" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-bold text-4xl" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a
                            className="text-blue-500 block mt-2 cursor-pointer"
                            onClick={() => setIsChangePasswordPopupOpen(true)}
                        >
                            Change Password
                        </a>
                    </div>
                    <button
                        className="mt-4 bg-red-500 text-white p-2 rounded-full px-4 hover:bg-red-600 transition duration-300 self-start"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    {isChangePasswordPopupOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <form className="space-y-4" onSubmit={handleChangePassword}>
                                    <div>
                                        <label className="block mb-2 font-bold text-xl" htmlFor="oldPassword">
                                            Current
                                        </label>
                                        <input
                                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                                            type="password"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-bold text-xl" htmlFor="newPassword">
                                            New Password
                                        </label>
                                        <input
                                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                                            type="password"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-bold text-xl" htmlFor="confirmNewPassword">
                                            Confirm New Password
                                        </label>
                                        <input
                                            className="border-2 border-black w-full p-2 rounded-lg text-center text-xl"
                                            type="password"
                                            id="confirmNewPassword"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            className="bg-blue-500 text-white p-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p- px-4 rounded-full hover:bg-red-600 transition duration-300"
                                            type="button"
                                            onClick={() => setIsChangePasswordPopupOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
