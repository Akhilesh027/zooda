import React, { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, shuffleArray } from "../../utils/api.ts";
import CompanyListItem from "./CompanyListItem.tsx";
import PromotionBanner from "../promotion/PromotionBanner.tsx";
import PromotionPopup from "../promotion/PromotionPopup.tsx";

interface Company { _id: string; name: string; logoUrl?: string; followers?: string; engagementRate?: number | string; category?: string; subcategory?: string; posts?: any[]; products?: any[]; rank?: number; description?: string; siteUrl?: string; }
interface User { _id?: string; name?: string; email?: string; isLoggedIn: boolean; }
interface Props {
  onSelectCompany: (company: Company) => void;
  user?: User;
  allPromotions: any[];
  onClaimOffer: (promotion: any) => void;
}

const CompanyListPage: React.FC<Props> = ({ onSelectCompany, user, allPromotions, onClaimOffer }) => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"All Businesses" | "Top Ranked">("All Businesses");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [currentPopupPromotion, setCurrentPopupPromotion] = useState<any | null>(null);
  const [usedPromotions, setUsedPromotions] = useState<string[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchSubcategories(selectedCategory); }, [selectedCategory]);

  const bannerPromotions = allPromotions.filter(p => (p.displayType === "banner" || p.type === "banner") && p.isActive && new Date(p.endDate) > new Date());
  const popupPromotions = allPromotions.filter(p => (p.displayType === "popup" || p.type === "popup") && p.isActive && new Date(p.endDate) > new Date() && !usedPromotions.includes(p._id));

  useEffect(() => {
    if (popupPromotions.length > 0) {
      const p = popupPromotions[0];
      setTimeout(() => { setCurrentPopupPromotion(p); setShowPromotionPopup(true); setUsedPromotions(prev => [...prev, p._id]); }, 2000);
    }
    // eslint-disable-next-line
  }, [popupPromotions.length]);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/business/all`);
        const data = await response.json();
        if (Array.isArray(data)) {
          // Convert to Company shape (simplified)
          const companies = data.map((item: any, index: number) => ({
            _id: item._id,
            rank: index + 1,
            name: item.businessName || "Unnamed",
            description: item.businessDescription || "",
            followers: item.followers || "0",
            siteUrl: item.businessWebsite || "#",
            logoUrl: item.logoUrl || "https://placehold.co/100x100?text=No+Logo",
            posts: item.posts || [],
            products: item.products || [],
            engagementRate: item.engagementRate || 0,
            category: item.businessCategory || "Ecommerce",
            subcategory: item.subcategory || "General",
          }));
          setAllCompanies(companies);
        }
      } catch (err) {
        console.error("Error fetching businesses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    let list = [...allCompanies];
    if (selectedCategory !== "All") list = list.filter(c => c.category === selectedCategory);
    if (selectedSubcategory !== "All") list = list.filter(c => c.subcategory === selectedSubcategory);
    if (activeTab === "Top Ranked") return list.sort((a, b) => Number(b.engagementRate as any) - Number(a.engagementRate as any));
    return shuffleArray(list);
  }, [allCompanies, selectedCategory, selectedSubcategory, activeTab]);

  const zigzagContent = useMemo(() => {
    const content: Array<Company | any> = [];
    let bannerIndex = 0;
    filteredCompanies.forEach((company, index) => {
      content.push(company);
      if ((index + 1) % 3 === 0 && bannerPromotions.length > 0) {
        content.push(bannerPromotions[bannerIndex % bannerPromotions.length]);
        bannerIndex++;
      }
    });
    return content;
  }, [filteredCompanies, bannerPromotions]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`);
      const data = await res.json();
      if (Array.isArray(data)) setCategories(["All", ...data.map((c:any)=>c.name)]);
      else if (data.success && Array.isArray(data.categories)) setCategories(["All", ...data.categories.map((c:any)=>c.name)]);
      else setCategories(["All","Ecommerce","LMS","Technology","Food","Fashion"]);
    } catch {
      setCategories(["All","Ecommerce","LMS","Technology","Food","Fashion"]);
    }
  };

  const fetchSubcategories = async (category: string) => {
    if (category === "All") { setSubcategories(["All"]); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`);
      const data = await res.json();
      let categoriesData: any[] = [];
      if (Array.isArray(data)) categoriesData = data;
      else if (data.success && Array.isArray(data.categories)) categoriesData = data.categories;
      const selected = categoriesData.find(c=>c.name===category);
      if (selected && Array.isArray(selected.subcategories)) setSubcategories(["All", ...selected.subcategories.map((s:any)=>s.name)]);
      else setSubcategories(["All","General"]);
    } catch {
      setSubcategories(["All","General"]);
    }
  };

  if (loading) return <div className="app-center"><p className="text-default">Loading companies...</p></div>;

  return (
    <>
      <main className="company-list-container">
        <div className="tabs-container">
          <div className="tabs">
            <button className={`tab ${activeTab==="All Businesses"?"active":""}`} onClick={()=>setActiveTab("All Businesses")}>All Businesses</button>
            <button className={`tab ${activeTab==="Top Ranked"?"active":""}`} onClick={()=>setActiveTab("Top Ranked")}>Top Ranked</button>
          </div>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e)=>{ setSelectedCategory(e.target.value); setSelectedSubcategory("All"); }}>
              {categories.map(cat=> <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          {subcategories.length>1 && (
            <div className="filter-group">
              <label>Subcategory:</label>
              <select value={selectedSubcategory} onChange={(e)=>setSelectedSubcategory(e.target.value)}>{subcategories.map(s=> <option key={s} value={s}>{s}</option>)}</select>
            </div>
          )}
        </div>

        <div className="company-cards-grid">
          {zigzagContent.length>0 ? zigzagContent.map((item, index) => {
            if (item && item.rank !== undefined) {
              return <div key={`company-${item._id}-${index}`} className="company-card-wrapper">
                <CompanyListItem company={{...item, engagementRate: (item.engagementRate as any)?.toFixed?.(1) ?? item.engagementRate} } onSelectCompany={onSelectCompany} user={user} onLoginClick={() => setShowLoginModal(true)} />
              </div>;
            } else {
              return <div key={`banner-${item._id}-${index}`} className="banner-card-wrapper">
                <PromotionBanner promotion={item} onClaimOffer={onClaimOffer} />
              </div>;
            }
          }) : <div className="no-companies-message">No businesses found.</div>}
        </div>

        {showPromotionPopup && currentPopupPromotion && <PromotionPopup promotion={currentPopupPromotion} onClose={() => setShowPromotionPopup(false)} onClaimOffer={(p:any)=>{ onClaimOffer(p); setShowPromotionPopup(false); }} />}

      </main>
    </>
  );
};

export default CompanyListPage;
