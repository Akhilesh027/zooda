import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api.ts";

interface Post { _id?: string; imageUrl?: string; content?: string; likes?: number; comments?: number; }
interface User { _id?: string; name?: string; }

const AllPostsPage = ({ onSelectPost, user, onLoginRequest }: { onSelectPost: (p: Post) => void; user?: User; onLoginRequest?: () => void }) => {
  const [activeTab, setActiveTab] = useState<"Following" | "Unfollowing">("Following");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/post/all`);
      const data = await res.json();
      setPosts(data.posts || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  if (loading) return <div className="app-center"><p>Loading {activeTab.toLowerCase()} posts...</p></div>;
  if (error) return <div className="app-center app-error"><p>⚠️ {error}</p><button onClick={fetchPosts}>Retry</button></div>;

  return (
    <>
      <main className="all-posts-page">
        <div className="tabs-container">
          <div className="tabs">
            <button className={`tab ${activeTab==="Following"?"active":""}`} onClick={() => setActiveTab("Following")}>Following</button>
            <button className={`tab ${activeTab==="Unfollowing"?"active":""}`} onClick={() => setActiveTab("Unfollowing")}>Unfollowing</button>
          </div>
        </div>

        {posts.length === 0 ? <div className="no-posts">No {activeTab.toLowerCase()} posts found</div> : <div className="posts-feed">{posts.map((post, idx) => (
          <div key={post._id || idx} className="post-feed-item" onClick={() => onSelectPost(post)}>
            <img src={post.imageUrl} alt={post.content} />
            <div className="post-meta"><strong>{post.likes} likes</strong></div>
          </div>
        ))}</div>}
      </main>
    </>
  );
};

export default AllPostsPage;
