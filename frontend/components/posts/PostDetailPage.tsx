import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

interface User {
  _id?: string;
  name?: string;
  email?: string;
}

interface Company {
  _id?: string;
  name?: string;
  logoUrl?: string;
  siteUrl?: string;
}

interface Post {
  _id?: string;
  businessId?: string;
  content?: string;
  caption?: string;
  imageUrl?: string;
  mediaUrl?: string;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  createdAt?: string;
  company?: Company;
  [key: string]: any;
}

interface Props {
  post: Post;
  user?: User;
  onBack: () => void;
  onLoginRequest?: () => void; // optional callback to open login modal
  onLikeToggle?: (postId: string) => void; // optional parent callback
}

const PostDetailPage: React.FC<Props> = ({ post, user, onBack, onLoginRequest, onLikeToggle }) => {
  const [postData, setPostData] = useState<Post>(post);
  const [isLiked, setIsLiked] = useState<boolean>(!!post.isLiked);
  const [likesCount, setLikesCount] = useState<number>(post.likes || 0);
  const [comments, setComments] = useState<Array<{ user?: { name?: string }; text: string }>>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [submittingComment, setSubmittingComment] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string>("");

  useEffect(() => {
    setPostData(post);
    setIsLiked(!!post.isLiked);
    setLikesCount(post.likes || 0);
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post._id]);

  const fetchComments = async () => {
    if (!post._id) return;
    try {
      setLoadingComments(true);
      const res = await axios.get(`${API_BASE_URL}/api/post/${post._id}/comments`);
      if (res.data && Array.isArray(res.data.comments)) {
        setComments(res.data.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error loading comments", err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    if (!user?._id) {
      setActionError("Please login to like posts.");
      if (onLoginRequest) onLoginRequest();
      return;
    }

    try {
      // Optional parent callback for optimistic update
      if (onLikeToggle && post._id) onLikeToggle(post._id);

      // Optimistic UI
      setIsLiked((v) => !v);
      setLikesCount((c) => (isLiked ? Math.max(0, c - 1) : c + 1));

      await axios.post(`${API_BASE_URL}/api/post/${post._id}/like`, { userId: user._id });
      setActionError("");
    } catch (err: any) {
      console.error("Like error", err);
      // rollback
      setIsLiked((v) => !v);
      setLikesCount((c) => (isLiked ? c + 1 : Math.max(0, c - 1)));
      setActionError(err?.response?.data?.message || "Failed to like post.");
    }
  };

  const handleCommentSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!commentText.trim()) return;
    if (!user?._id) {
      setActionError("Please login to comment.");
      if (onLoginRequest) onLoginRequest();
      return;
    }

    try {
      setSubmittingComment(true);
      const payload = { text: commentText, userId: user._id };
      const res = await axios.post(`${API_BASE_URL}/api/post/${post._id}/comment`, payload);
      if (res.data && res.data.comment) {
        // append the returned comment (server-side)
        setComments((prev) => [...prev, res.data.comment]);
      } else {
        // optimistic fallback
        setComments((prev) => [...prev, { user: { name: user.name }, text: commentText }]);
      }
      setCommentText("");
      setActionError("");
    } catch (err: any) {
      console.error("Comment error", err);
      setActionError(err?.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/post/${post._id}`;
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: postData.company?.name || "Post",
          text: postData.caption || postData.content || "",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Post link copied to clipboard");
      }
    } catch (err) {
      console.error("Share failed", err);
      setActionError("Failed to share the post.");
    }
  };

  const formattedDate = postData.createdAt ? new Date(postData.createdAt).toLocaleString() : "";

  return (
    <div className="post-detail-page">
      <header className="app-header app-header--navigation">
        <button className="back-button" onClick={onBack} aria-label="Back">
          <span className="material-icons">arrow_back</span>
        </button>
        <h2 className="header-title">Post</h2>
        <div />
      </header>

      <main className="post-detail-content">
        <article className="post-article">
          {/* Company header */}
          <div className="post-company">
            <div className="company-avatar">
              {postData.company?.logoUrl ? (
                <img src={postData.company.logoUrl} alt={postData.company?.name} />
              ) : (
                <div className="avatar-fallback">{postData.company?.name?.charAt(0) || "B"}</div>
              )}
            </div>
            <div className="company-info">
              <strong className="company-name">{postData.company?.name || "Company"}</strong>
              <span className="post-time">{formattedDate}</span>
            </div>
            {postData.company?.siteUrl && (
              <a href={postData.company.siteUrl} target="_blank" rel="noopener noreferrer" className="visit-link">Visit</a>
            )}
          </div>

          {/* Media */}
          {postData.imageUrl || postData.mediaUrl ? (
            <div className="post-media">
              <img src={postData.imageUrl || postData.mediaUrl} alt={postData.caption || postData.content || "Post media"} />
            </div>
          ) : null}

          {/* Content */}
          <div className="post-body">
            {postData.caption && <p className="post-caption">{postData.caption}</p>}
            {postData.content && <p className="post-content">{postData.content}</p>}
          </div>

          {/* Actions */}
          <div className="post-actions">
            <button className={`like-btn ${isLiked ? "liked" : ""}`} onClick={handleLike} aria-pressed={isLiked}>
              <span className="material-icons">{isLiked ? "favorite" : "favorite_border"}</span>
              <span>{likesCount}</span>
            </button>

            <button className="comment-btn" onClick={() => {
              const el = document.getElementById("comment-input");
              el?.focus();
            }}>
              <span className="material-icons">chat_bubble_outline</span>
              <span>{postData.comments || comments.length}</span>
            </button>

            <button className="share-btn" onClick={handleShare}>
              <span className="material-icons">share</span>
            </button>
          </div>

          {actionError && (
            <div className="action-error">
              <span>{actionError}</span>
            </div>
          )}

          {/* Comments */}
          <section className="comments-section">
            <h3>Comments</h3>

            {loadingComments ? (
              <div className="loading-state">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="empty-state">No comments yet — be the first!</div>
            ) : (
              <div className="comments-list">
                {comments.map((c, idx) => (
                  <div key={idx} className="comment-item">
                    <strong className="comment-user">{c.user?.name || "User"}</strong>
                    <span className="comment-text">{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <input
                id="comment-input"
                type="text"
                placeholder={user?._id ? "Write a comment..." : "Login to comment"}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!user?._id || submittingComment}
              />
              <button type="submit" disabled={!commentText.trim() || submittingComment}>
                {submittingComment ? "Posting..." : "Post"}
              </button>
            </form>
          </section>
        </article>
      </main>

      {/* minimal inline styles hint (move to CSS file) */}
      <style jsx>{`
        .post-detail-page { background: #000; color: #fff; min-height: 100vh; }
        .post-detail-content { max-width: 800px; margin: 0 auto; padding: 16px; }
        .post-company { display:flex; align-items:center; gap:12px; padding:12px 0; }
        .company-avatar img { width:48px; height:48px; border-radius:50%; object-fit:cover; }
        .post-media img { width:100%; border-radius:8px; display:block; margin: 12px 0; }
        .post-actions { display:flex; gap:12px; align-items:center; padding:8px 0; }
        .like-btn.liked .material-icons { color: #e53e3e; }
        .comments-section { margin-top:16px; }
        .comment-form { display:flex; gap:8px; margin-top:12px; }
        .comment-form input { flex:1; padding:8px 12px; border-radius:6px; border:1px solid #272727; background:#000; color:#fff; }
        .comment-form button { padding:8px 12px; border-radius:6px; background:#0095f6; border:none; color:white; }
        .action-error { color:#ffbaba; margin-top:8px; }
      `}</style>
    </div>
  );
};

export default PostDetailPage;
