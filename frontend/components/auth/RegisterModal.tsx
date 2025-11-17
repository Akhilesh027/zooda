import React, { useState } from "react";

const RegisterModal = ({ isOpen, onClose, onOpenLogin }: { isOpen: boolean; onClose: () => void; onOpenLogin?: () => void; }) => {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // implement registration
    onClose();
    onOpenLogin && onOpenLogin();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content register-modal">
        <div className="modal-header"><h3>Create Account</h3><button onClick={onClose}>✕</button></div>
        <form onSubmit={handleSubmit}>
          <input placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required/>
          <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <div className="modal-actions">
            <button type="submit">Register</button>
            <button type="button" onClick={() => { onOpenLogin && onOpenLogin(); }}>Login instead</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
