import React from "react";

interface User { _id?: string; name: string; isLoggedIn: boolean; }

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onNavClick: (page: string) => void;
  user?: User;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose, activePage, onNavClick, user, onLogin, onRegister, onLogout, onProfileClick }) => {
  if (!isOpen) return null;

  const handleNav = (p: string) => {
    onNavClick(p);
    onClose();
  };

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <span className="material-icons">hub</span>
            <span className="logo-text">Zetova</span>
          </div>
          <button onClick={onClose} className="mobile-menu-close"><span className="material-icons">close</span></button>
        </div>
        <nav className="mobile-menu-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("Home"); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("About"); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav("Posts"); }}>All Posts</a>
          {user?.isLoggedIn && <a href="#" onClick={(e) => { e.preventDefault(); onProfileClick && onProfileClick(); onClose(); }}>My Profile</a>}
        </nav>

        <div className="mobile-menu-auth">
          {user?.isLoggedIn ? (
            <>
              <div className="mobile-menu-user">Hello, {user.name}</div>
              <button onClick={() => { onLogout && onLogout(); onClose(); }} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => { onLogin && onLogin(); onClose(); }} className="btn btn-outline">Login</button>
              <button onClick={() => { onRegister && onRegister(); onClose(); }} className="btn btn-solid">Register</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
