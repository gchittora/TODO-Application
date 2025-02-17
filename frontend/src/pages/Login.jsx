import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // TODO: Add actual authentication logic
        console.log("Logging in with:", { email, password });

        // Simulate successful login
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
