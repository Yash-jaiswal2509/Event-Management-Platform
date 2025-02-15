import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.username}</p>
        </div>
    );
};

export default Dashboard; 