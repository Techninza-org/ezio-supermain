import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilMediaPlay, cilTrash } from "@coreui/icons";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { AppHeader, AppSidebar } from "../../../components";

const AllUserDetail = () => {
  const [userData, setUserData] = useState(null);
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}superAdmin/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUsers();
  }, [id, token]);

  const deleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}superAdmin/user/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        post: prevData.post.map((post) =>
          post.id === selectedPost
            ? { ...post, comment: post.comment.filter((c) => c.id !== commentId) }
            : post
        ),
      }));
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete the comment. Please try again.");
    }
  };

  const deletepost = async (Id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}superAdmin/user/post/${Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        post: prevData.post.filter((post) => post.id !== Id),
      }));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };


  if (!userData) {
    return <p className="text-center p-5">Loading...</p>;
  }

  return (
    <>
  <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
    <div className="container py-4">
      <div className="card shadow-sm p-3 mb-4 text-center">
        <img
          src={userData.image}
          alt={userData.username}
          className="rounded-circle border img-fluid mx-auto"
          style={{ width: "100px", height: "100px" }}
        />
        <h2 className="h5 mt-2">{userData.username}</h2>
        <p className="text-muted mb-0">{userData.email}</p>
        <p className="text-muted mb-0">{userData.phone}</p>
      </div>

      <h3 className="mb-3">Posts</h3>
      <div className="row">
        {userData.post.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              {post.media_type === "VIDEO" ? (
                <div className="position-relative">
                  <img
                    src={post.thumbnail}
                    alt="Video thumbnail"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <button
                    className="btn btn-dark position-absolute top-50 start-50 translate-middle"
                    onClick={() => window.open(post.image, "_blank")}
                  >
                    <CIcon icon={cilMediaPlay} size="lg" />
                  </button>
                </div>
              ) : (
                <img
                  src={post.image || ""}
                  alt={post.description}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="fw-semibold mb-1">{post.description}</p>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletepost(post.id)}
                  >
                    <CIcon icon={cilTrash} />
                  </button>
                </div>
                <p className="text-muted small">{post.place}</p>
                <p className="text-muted small">Likes: {post.Likes.length}</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectedPost(post.id);
                    setShowModal(true);
                  }}
                >
                  View Comments ({post.comment.length})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Comments</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedPost &&
            userData.post
              .find((post) => post.id === selectedPost)
              ?.comment.map((comment) => (
                <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
                  <span>{comment.comment}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteComment(comment.id)}
                  >
                    <CIcon icon={cilTrash} />
                  </button>
                </li>
              ))}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  </div>
    </>
  );
};

export default AllUserDetail;