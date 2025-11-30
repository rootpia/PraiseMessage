import { Outlet, Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { useEffect, useState } from 'react';
import type { User } from '../types';

export default function Layout() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(userService.getCurrentUser());
    }, []);

    const handleLogout = () => {
        userService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex-shrink-0 flex items-center font-bold text-xl text-indigo-600">
                                Praise Message
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <span className="text-sm text-gray-500">Hi, {user.name}</span>
                                    <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                    <Link to="/send" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Send Praise</Link>
                                    <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                                </>
                            ) : (
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet context={{ user, setUser }} />
            </main>
        </div>
    );
}
