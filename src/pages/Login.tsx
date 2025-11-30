import { useNavigate, useOutletContext } from 'react-router-dom';
import { userService } from '../services/userService';

export default function Login() {
    const users = userService.getUsers();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setUser } = useOutletContext<any>();

    const handleLogin = (userId: string) => {
        const user = userService.login(userId);
        if (user) {
            setUser(user);
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Select a User to Login</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleLogin(user.id)}
                        className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col items-center"
                    >
                        <img className="h-20 w-20 rounded-full mb-4" src={user.avatarUrl} alt={user.name} />
                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
}
