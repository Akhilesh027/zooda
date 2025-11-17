import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  profileImage?: string;
}

interface Company {
  _id: string;
  name: string;
}

const UserProfilePage = ({
  user,
  onBack,
  onSelectCompany,
  onLogout,
  allCompanies,
}: {
  user: User;
  onBack: () => void;
  onSelectCompany: (c: Company) => void;
  onLogout: () => void;
  allCompanies: Company[];
}) => {
  const [followingBusinesses, setFollowingBusinesses] = useState<Company[]>([]);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    website: user.website || "",
    bio: user.bio || "",
  });

  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [saveLoading, setSaveLoading] = useState(false);

  /** Fetch following list */
  const fetchFollowingBusinesses = useCallback(async () => {
    if (!user._id) return;
    try {
      setLoading(true);
      const resp = await axios.get(
        `${API_BASE_URL}/api/user/${user._id}/following`
      );

      const followedIds = resp.data.following || [];
      const followedCompanies = allCompanies.filter((c) =>
        followedIds.includes(c._id)
      );

      setFollowingBusinesses(followedCompanies);
    } catch (err) {
      console.error("Error fetching following list:", err);
    } finally {
      setLoading(false);
    }
  }, [user._id, allCompanies]);

  useEffect(() => {
    fetchFollowingBusinesses();
  }, [fetchFollowingBusinesses]);

  /** Edit handlers */
  const handleInput = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      await axios.put(`${API_BASE_URL}/api/user/${user._id}`, {
        ...formData,
        profileImage,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <div className="app-center">Loading profile...</div>;

  return (
    <div className="user-profile-page">
      {/* Back button */}
      <header className="app-header app-header--navigation">
        <button className="back-button" onClick={onBack}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1>User Profile</h1>
        <div className="header-placeholder"></div>
      </header>

      <main className="profile-content">
        {/* Profile Card */}
        <section className="profile-section">
          <div className="profile-header-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-container">
                {profileImage ? (
                  <img src={profileImage} className="profile-avatar" />
                ) : (
                  <span className="material-icons profile-avatar-icon">
                    account_circle
                  </span>
                )}

                {isEditing && (
                  <label
                    className="avatar-upload-label"
                    htmlFor="profile-upload"
                  >
                    <span className="material-icons">edit</span>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              {!isEditing && (
                <button
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <span className="material-icons">edit</span>Edit Profile
                </button>
              )}
            </div>

            <div className="profile-details">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-group">
                    <label>Website</label>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      rows={4}
                      name="bio"
                      value={formData.bio}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>

                    <button
                      className="btn btn-primary"
                      disabled={saveLoading}
                      onClick={handleSave}
                    >
                      {saveLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-info">
                  <h1 className="user-name">{user.name}</h1>
                  <p>{user.email}</p>
                  {user.phone && <p>{user.phone}</p>}
                  {user.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      className="user-website"
                    >
                      {user.website}
                    </a>
                  )}
                  {user.bio && <p className="user-bio">{user.bio}</p>}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Logout */}
        <section className="logout-section">
          <button onClick={onLogout} className="btn btn-danger logout-btn">
            <span className="material-icons">logout</span> Logout
          </button>
        </section>
      </main>
    </div>
  );
};

export default UserProfilePage;
