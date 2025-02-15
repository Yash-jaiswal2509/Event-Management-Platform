import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    console.log(isAuthenticated);   
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-17 items-center">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-blue-1000 hover:text-blue-800 cursor-pointer flex items-center">
                            <img src="/Logo.webp" alt="logo" className="w-12 h-12 mr-2 rounded-full border-2 border-blue-800 hover:border-blue-950 transition-all duration-300" />
                            Event Management Platform
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        {isAuthenticated ? (
                            <Button
                                onClick={logout}
                                className='cursor-pointer'
                                variant="outline"
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button className='cursor-pointer' variant="outline">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button className='cursor-pointer bg-blue-800 hover:bg-blue-950'>Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 