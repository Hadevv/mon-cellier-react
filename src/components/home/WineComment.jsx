import React, { useState, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import {
  getWineComments,
  addWineComment,
  editWineComment,
  deleteWineComment,
} from "@/services/api/apiService";

import CommentList from "./CommentList";

const WineComment = ({ wineId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const credentials = useAuthStore((state) => state.credentials);

  useEffect(() => {
    // Charge les commentaires du vin lors du montage du composant
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const fetchedComments = await getWineComments(wineId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error loading comments:", error.message);
    }
  };

  const handleAddComment = async () => {
    if (!credentials) {
      console.log("L'utilisateur n'est pas connecté. Redirigez-le vers la page de connexion.");
      return;
    }

    console.log("Credentials:", credentials);

    try {
      await addWineComment(wineId, newComment, credentials);
      setNewComment("");
      loadComments(); // Recharge les commentaires après l'ajout
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!credentials) {
      console  .log(
        "L'utilisateur n'est pas connecté. Redirigez-le vers la page de connexion.",
      );
      // Vous pouvez également afficher un message à l'utilisateur
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

  const handleDeleteComment = async (commentId) => {
    if (!credentials) {
      console.log(
        "L'utilisateur n'est pas connecté. Redirigez-le vers la page de connexion.",
      );
      // Vous pouvez également afficher un message à l'utilisateur
      return;
    }

    try {
      await deleteWineComment(wineId, commentId);
      loadComments(); // Recharge les commentaires après la suppression
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
};

export default WineComment;
