import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { imageService } from '../services/imageService';
import { messageService } from '../services/messageService';
import type { User, PraiseImage } from '../types';

export default function SendPraise() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [images, setImages] = useState<PraiseImage[]>([]);

    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const user = userService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }
        setCurrentUser(user);
        setUsers(userService.getUsers().filter(u => u.id !== user.id));
        setImages(imageService.getImages());
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser || !selectedUser || !selectedImage || !message) return;

        messageService.sendMessage(currentUser.id, selectedUser, selectedImage, message);
        navigate('/');
    };

    if (!currentUser) return null;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow sm:rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Praise</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        required
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    >
                        <option value="">Select a colleague</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Card</label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                onClick={() => setSelectedImage(img.id)}
                                className={`cursor-pointer rounded-lg border-2 overflow-hidden ${selectedImage === img.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-transparent'
                                    }`}
                            >
                                <img src={img.url} alt={img.alt} className="w-full h-24 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Send Praise
                    </button>
                </div>
            </form>
        </div>
    );
}
