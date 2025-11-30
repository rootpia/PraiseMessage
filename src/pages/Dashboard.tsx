import { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { messageService } from '../services/messageService';
import { imageService } from '../services/imageService';
import type { PraiseMessage, User } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [messages, setMessages] = useState<PraiseMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = userService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }
        setCurrentUser(user);
        setMessages(messageService.getMessagesForUser(user.id));
    }, [navigate]);

    if (!currentUser) return null;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Received Praise</h1>
            {messages.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No messages yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {messages.map((msg) => {
                        const sender = userService.getUserById(msg.senderId);
                        const image = imageService.getImageById(msg.imageId);
                        return (
                            <div key={msg.id} className="bg-white overflow-hidden shadow rounded-lg">
                                {image && (
                                    <img className="w-full h-48 object-cover" src={image.url} alt={image.alt} />
                                )}
                                <div className="p-4">
                                    <div className="flex items-center mb-4">
                                        {sender && (
                                            <img className="h-10 w-10 rounded-full mr-3" src={sender.avatarUrl} alt={sender.name} />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{sender?.name || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{msg.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
