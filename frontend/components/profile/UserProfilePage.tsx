import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api.ts";

interface Company { _id: string; name: string; }
interface User { _id?: string; name?: string; email?: string; profileImage?: string; phone?: string; bio?: string; website?: string; }

const UserProfilePage = ({ user, onBack, onSelectCompany, onLogout, allCompanies }: { user: User; onBack: () => void; onSelectCompany: (c: Company) => void; onLogout: () => void; allCompanies: Company[] }) => {
  const [followingBusinesses, setFollowingBusinesses] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user.name || "", email: user.email || "", phone: user.phone || "", bio: user.bio || "", website: user.website || "" });
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchFollowingBusinesses = useCallback(async () => {
    if (!user._id) return;
    try {
      setLoading(true);
      const resp = await axios.get(`${API_BASE_URL}/api/user/${user._id}/following`);
      const followedIds = resp.data.following || [];
      const followedCompanies = allCompanies.filter(c => followedIds.includes(c._id));
      setFollowingBusinesses(followedCompanies);
    } catch (err) {
      console.error("Error fetching followed businesses:", err);
    } finally {
      setLoading(false);
    }
  }, [user._id, allCompanies]);

  useEffect(() => { fetchFollowingBusinesses(); }, [fetchFollowingBusinesses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true);
      await axios.put(`${API_BASE_URL}/api/user/${user._id}`, { ...formData, profileImage });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <div className="app-center"><p>Loading profile...</p></div>;

  return (
    <div className="user-profile-page">
      <main className="profile-content">
        <section className="profile-section">
          <div className="profile-header-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-container">
                {profileImage ? <img src={profileImage} alt="Profile" className="profile-avatar" /> : <span className="material-icons profile-avatar-icon">account_circle</span>}
                {isEditing && <label htmlFor="profile-image-upload" className="avatar-upload-label"><span className="material-icons">edit</span><input id="profile-image-upload" type="file" accept="image/*" onChange={handleImageChange} /></label>}
              </div>

              {!isEditing && <button onClick={() => setIsEditing(true)} className="edit-profile-btn"><span className="material-icons">edit</span>Edit Profile</button>}
            </div>

            <div className="profile-details">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group"><label>Full Name</label><input name="name" value={formData.name} onChange={handleInputChange} /></div>
                  <div className="form-group"><label>Email</label><input name="email" value={formData.email} onChange={handleInputChange} /></div>
                  <div className="form-group"><label>Phone</label><input name="phone" value={formData.phone} onChange={handleInputChange} /></div>
                  <div className="form-group"><label>Website</label><input name="website" value={formData.website} onChange={handleInputChange} /></div>
                  <div className="form-group"><label>Bio</label><textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} /></div>
                  <div className="form-actions">
                    <button onClick={() => { setIsEditing(false); }} className="btn btn-outline">Cancel</button>
                    <button onClick={handleSaveProfile} className="btn btn-primary" disabled={saveLoading}>{saveLoading ? "Saving..." : "Save Changes"}</button>
                  </div>
                </div>
              ) : (
                <div className="profile-info">
                  <h1 className="user-name">{user.name}</h1>
                  <p className="user-email">{user.email}</p>
                  {user.phone && <p className="user-phone">{user.phone}</p>}
                  {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" className="user-website">{user.website}</a>}
                  {user.bio && <p className="user-bio">{user.bio}</p>}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="logout-section">
          <button onClick={onLogout} className="btn btn-danger logout-btn"><span className="material-icons">logout</span>Logout</button>
        </section>

      </main>
    </div>
  );
};

export default UserProfilePage;
