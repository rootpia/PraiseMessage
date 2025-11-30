import { useNavigate, useOutletContext } from 'react-router-dom';
import { userService } from '../services/userService';

export default function Login() {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setUser } = useOutletContext<any>();

    const handleGithubLogin = async () => {
        const user = await userService.loginWithGithub();
        if (user) {
            setUser(user);
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Sign in to Praise Message</h2>
            <div className="w-full max-w-md">
                <button
                    onClick={handleGithubLogin}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in with GitHub
                </button>
            </div>
        </div>
    );
}
