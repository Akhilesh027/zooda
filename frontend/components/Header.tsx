import React from "react";

interface User { _id?: string; name: string; email: string; isLoggedIn: boolean; }

interface Props {
  title?: string;
  onBack?: () => void;
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onRegister?: () => void;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

const Header: React.FC<Props> = ({
  title,
  onBack,
  user,
  onLogin,
  onMenuToggle,
  isMenuOpen,
  onSearchClick,
  onProfileClick,
}) => {
  if (onBack) {
    return (
      <header className="app-header app-header--navigation">
        <button onClick={onBack} className="back-button" aria-label="Go back">
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="header-title">{title}</h1>
        <div className="header-placeholder" />
      </header>
    );
  }

  if (title) {
    return (
      <header className="app-header app-header--centered">
        <h1 className="header-title">{title}</h1>
      </header>
    );
  }

  return (
    <header className="app-header">
      <div className="header-logo" aria-label="Zetova logo">
        <span className="material-icons">hub</span>
      </div>
      <div className="search-container" onClick={onSearchClick}>
        <span className="material-icons">search</span>
        <input type="text" placeholder="Search companies and products..." readOnly className="search-input" />
      </div>
      <div className="account-section">
        {user ? (
          <button onClick={onProfileClick} className="menu-button" title="Profile">
            <span className="material-icons">account_circle</span>
          </button>
        ) : (
          <button onClick={onLogin} className="menu-button" title="Login">
            <span className="material-icons">login</span>
          </button>
        )}
      </div>
      <button className="menu-button" onClick={onMenuToggle} aria-label="Toggle menu">
        <span className="material-icons">{isMenuOpen ? "close" : "menu"}</span>
      </button>
    </header>
  );
};

export default Header;
