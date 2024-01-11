import React, { useState, useEffect } from "react";
// store Zustand
import useAuthStore from "@/store/authStore";
// services
import {
  getWineComments,
  addWineComment,
  editWineComment,
  deleteWineComment,
} from "@/services/api/commentService.js";
// components
import CommentList from "./WineCommentList";

export default function WineComment({ wineId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const credentials = useAuthStore((state) => state.credentials);

  useEffect(() => {
    loadComments();
  }, []);

  // loadComments récupére les commentaires d'un vin
  const loadComments = async () => {
    try {
      const fetchedComments = await getWineComments(wineId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error loading comments:", error.message);
    }
  };

  // handleAddComment gére l'ajout d'un commentaire
  const handleAddComment = async () => {
    if (!credentials) {
      console.log(
        "L'utilisateur n'est pas connecté. Redirigez-le vers la page de connexion.",
      );
      return;
    }

    console.log("Credentials:", credentials);

    try {
      await addWineComment(wineId, newComment, credentials);
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  // handleEditComment gére la modification d'un commentaire
  const handleEditComment = async (commentId) => {
    if (!credentials) {
      console.log(
        "L'utilisateur n'est pas connecté. Redirigez-le vers la page de connexion.",
      );
      return;
    }

    try {
      await editWineComment(wineId, commentId, editedComment);
      setEditCommentId(null);
      setEditedComment("");
      loadComments();
    } catch (error) {
      console.error("Error editing comment:", error.message);
    }
  };

  // handleDeleteComment gére la suppression d'un commentaire
  const handleDeleteComment = async (commentId) => {
    if (!credentials) {
      console.log(
        "L'utilisateur n'est pas connecté. Redirigez-le vers la page de connexion.",
      );
      return;
    }

    try {
      await deleteWineComment(wineId, commentId);
      loadComments();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 border rounded">
      <h2 className="text-xl font-bold mb-4">Commentaires</h2>
      <CommentList
        comments={comments}
        editCommentId={editCommentId}
        setEditCommentId={setEditCommentId}
        newComment={newComment}
        setNewComment={setNewComment}
        editedComment={editedComment}
        setEditedComment={setEditedComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
      />
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={editCommentId !== null ? editedComment : newComment}
          onChange={(e) =>
            editCommentId !== null
              ? setEditedComment(e.target.value)
              : setNewComment(e.target.value)
          }
          placeholder="Ajouter un commentaire..."
          className="border p-2 flex-1"
        />
        <button
          onClick={
            editCommentId !== null ? handleEditComment : handleAddComment
          }
          className="bg-green-500 text-white p-2 rounded"
        >
          {editCommentId !== null ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </div>
  );
}
