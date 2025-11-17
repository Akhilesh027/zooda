import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api.ts";

interface Company { _id: string; name: string; logoUrl?: string; followers?: string; engagementRate?: number | string; description?: string; siteUrl?: string; rank?: number; }
interface User { _id?: string; name?: string; email?: string; isLoggedIn?: boolean; }

const CompanyListItem = ({ company, onSelectCompany, user, onLoginClick }: { company: Company; onSelectCompany: (c: Company) => void; user?: User; onLoginClick?: () => void; }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState<number>(Number(company.followers) || 0);

  useEffect(() => {
    const checkFollow = async () => {
      if (user?._id && company._id) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/follow/${company._id}/status/${user._id}`);
          if (res.data.success) {
            setIsFollowing(res.data.isFollowing);
            setFollowers(Number(res.data.followers) || followers);
          }
        } catch (err) {
          console.error("Error checking follow status", err);
        }
      }
    };
    checkFollow();
    // eslint-disable-next-line
  }, [user?._id, company._id]);

  const handleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?._id) {
      if (onLoginClick) onLoginClick();
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/follow/${company._id}`, { userId: user._id });
      if (res.data.success) {
        setIsFollowing(res.data.isFollowing);
        setFollowers(Number(res.data.followers) || followers);
      }
    } catch (err) {
      console.error("Follow error", err);
    }
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(company.siteUrl, "_blank");
  };

  return (
    <article className="company-card" onClick={() => onSelectCompany(company)} role="button" tabIndex={0}>
      <div className="company-row">
        <img src={company.logoUrl} alt={company.name} className="company-logo" />
        <div className="company-info">
          <h2 className="company-name">{company.name}</h2>
          <div className="company-stats">
            <span>{followers} Followers</span>
            <span>{company.engagementRate}% ER</span>
            <button className="visit-btn" onClick={handleVisit}>Visit site</button>
            <button className={`follow-btn ${isFollowing ? "following" : ""}`} onClick={handleFollow}>{isFollowing ? "Following" : "Follow +"}</button>
          </div>
          <p className="company-description">{company.description}</p>
        </div>
      </div>
    </article>
  );
};

export default CompanyListItem;
