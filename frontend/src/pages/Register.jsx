import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);
        try {
            await register(form);
            navigate("/", { replace: true });
        } catch (err) {
            // Laravel validation errors: { errors: { email: ["..."] } }
            setErrors(err.response?.data?.errors || { general: [err.response?.data?.message || "Registration failed"] });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {Object.values(errors).flat().map((msg, i) => (
                <p key={i} style={{ color: "red" }}>{msg}</p>
            ))}

            <input name="name" placeholder="Name"
                   value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email"
                   value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password"
                   value={form.password} onChange={handleChange} required />
            <input name="password_confirmation" type="password" placeholder="Confirm password"
                   value={form.password_confirmation} onChange={handleChange} required />

            <button disabled={submitting}>
                {submitting ? "Creating account..." : "Register"}
            </button>
            <p>Already account ekak thiyenawada? <Link to="/login">Login</Link></p>
        </form>
    );
}