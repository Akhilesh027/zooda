import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
  onOpenRegister?: () => void;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLogin, onOpenRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // perform login - adapt to your API
      // const res = await axios.post("/api/auth/login", { email, password });
      const mockUser = { _id: "u1", name: "Demo User", email, isLoggedIn: true };
      onLogin(mockUser);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content login-modal">
        <div className="modal-header"><h3>Login</h3><button onClick={onClose}>✕</button></div>
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
          <div className="modal-actions">
            <button type="submit" disabled={loading}>{loading ? "Logging..." : "Login"}</button>
            <button type="button" onClick={() => { onOpenRegister && onOpenRegister(); }}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
