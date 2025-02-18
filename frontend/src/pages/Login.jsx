import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username: userName, // Sending email as username because backend expects 'username'
                password: password
            });

            console.log("Login successful:", response.data);

            // Save the token in localStorage (optional)
            localStorage.setItem("token", response.data.token);

            // Navigate to dashboard after successful login
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="User name"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Dont have an account?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}
