import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Vehicle Compare</h1>
            {user ? (
                <>
                    <p>Welcome, {user.name}</p>
                    <Link to="/favorites">Favorites</Link>{" "}
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            )}
        </div>
    );
}