import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({ email, password });
      navigate("/login");
    } catch {
      alert("Помилка реєстрації");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

    <div>
        email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
      
    <div>
        password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
      

      <button type="submit">Register</button>
    </form>
  );
}