import React, { useEffect, useState } from "react";

// Global Components
import Header from "./components/Header.tsx";
import MobileMenu from "./components/MobileMenu.tsx";
import Banner from "./components/Banner.tsx";
import Footer from "./components/Footer.tsx";

// Pages
import CompanyListPage from "./components/company/CompanyListPage.tsx";
import CompanyProfilePage from "./components/company/CompanyProfilePage.tsx";
import SearchPage from "./components/search/SearchPage.tsx";
import UserProfilePage from "./components/profile/UserProfilePage.tsx";
import AllPostsPage from "./components/posts/AllPostsPage.tsx";
import PostDetailPage from "./components/posts/PostDetailPage.tsx";

// Auth
import LoginModal from "./components/auth/LoginModal.tsx";
import RegisterModal from "./components/auth/RegisterModal.tsx";

// Utils
import { getActivePromotions, Promotion } from "./utils/api.ts";

// Interfaces
interface Company {
  _id: string;
  name: string;
  [key: string]: any;
}

interface User {
  _id?: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("Home");

  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [allPromotions, setAllPromotions] = useState<Promotion[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Load User
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Load Promotions
  useEffect(() => {
    (async () => {
      const promos = await getActivePromotions();
      setAllPromotions(promos);
    })();
  }, []);

  const onClaimOffer = (promotion: Promotion) => {
    const url = promotion.targetUrl || promotion.link;
    if (url) window.open(url, "_blank");
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setActivePage("Home");
  };

  return (
    <div className="app-root">
      {/* Header */}
      <Header
        user={user || undefined}
        onLogin={() => setShowLoginModal(true)}
        onRegister={() => setShowRegisterModal(true)}
        isMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        onSearchClick={() => setActivePage("Search")}
        onProfileClick={() => setActivePage("Profile")}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activePage={activePage}
        user={user || undefined}
        onLogin={() => setShowLoginModal(true)}
        onRegister={() => setShowRegisterModal(true)}
        onProfileClick={() => setActivePage("Profile")}
        onNavClick={(page) => {
          setActivePage(page);
          setIsMobileMenuOpen(false);
        }}
      />

      {/* ROUTING */}
      <main>
        {/* HOME */}
        {activePage === "Home" && (
          <>
            <Banner />
            <CompanyListPage
              user={user || undefined}
              allPromotions={allPromotions}
              onClaimOffer={onClaimOffer}
              onSelectCompany={(company) => {
                setSelectedCompany(company);
                setActivePage("CompanyProfile");
              }}
            />
          </>
        )}

        {/* SEARCH */}
        {activePage === "Search" && (
          <SearchPage
            searchQuery=""
            searchResults={[]}
            loading={false}
            onBack={() => setActivePage("Home")}
            onSearchChange={(q) => console.log("Searching:", q)}
            onSelectSearchResult={(item) => console.log(item)}
          />
        )}

        {/* USER PROFILE */}
        {activePage === "Profile" && user && (
          <UserProfilePage
            user={user}
            allCompanies={[]}
            onBack={() => setActivePage("Home")}
            onLogout={handleLogout}
            onSelectCompany={(company) => {
              setSelectedCompany(company);
              setActivePage("CompanyProfile");
            }}
          />
        )}

        {/* POSTS LIST */}
        {activePage === "Posts" && (
          <AllPostsPage
            user={user || undefined}
            onSelectPost={(post) => {
              setSelectedPost(post);
              setActivePage("PostDetail");
            }}
          />
        )}

        {/* POST DETAIL */}
        {activePage === "PostDetail" && selectedPost && (
          <PostDetailPage
            post={selectedPost}
            user={user || undefined}
            onBack={() => setActivePage("Posts")}
          />
        )}

        {/* COMPANY PROFILE */}
        {activePage === "CompanyProfile" && selectedCompany && (
          <CompanyProfilePage
            company={selectedCompany}
            user={user || undefined}
            onBack={() => setActivePage("Home")}
            onSelectPost={(post) => {
              setSelectedPost(post);
              setActivePage("PostDetail");
            }}
            onSelectProduct={(product) => console.log(product)}
          />
        )}
      </main>

      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(u) => {
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
          setShowLoginModal(false);
        }}
        onOpenRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onOpenLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default App;
