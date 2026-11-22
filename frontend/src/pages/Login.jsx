import { useState } from "react";
import { useNavigate, useLocation, Link , Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const { register, user, loading } = useAuth();   // Login.jsx eke `login`

if (loading) return null;
if (user) return <Navigate to="/" replace />;

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await login(form.email, form.password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input name="email" type="email" placeholder="Email"
                   value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password"
                   value={form.password} onChange={handleChange} required />
            <button disabled={submitting}>
                {submitting ? "Logging in..." : "Login"}
            </button>
            <p>Account naadda? <Link to="/register">Register</Link></p>
        </form>
    );
}