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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      console.error(
        "Erreur lors du chargement des commentaires:",
        error.message,
      );
    }
  };

  // handleAddComment gére l'ajout d'un commentaire
  const handleAddComment = async () => {
    if (!credentials) {
      console.log("L'utilisateur n'est pas connecté");
      return;
    }

    console.log("Credentials :", credentials);

    try {
      await addWineComment(wineId, newComment, credentials);
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error.message);
    }
  };

  // handleEditComment gére la modification d'un commentaire
  const handleEditComment = async (commentId) => {
    if (!credentials) {
      console.log("L'utilisateur n'est pas connecté");
      return;
    }

    try {
      await editWineComment(wineId, commentId, editedComment);
      setEditCommentId(null);
      setEditedComment("");
      loadComments();
    } catch (error) {
      console.error(
        "Erreur lors de la modification du commentaire:",
        error.message,
      );
    }
  };

  // handleDeleteComment gére la suppression d'un commentaire
  const handleDeleteComment = async (commentId) => {
    if (!credentials) {
      console.log("L'utilisateur n'est pas connecté");
      return;
    }

    try {
      await deleteWineComment(wineId, commentId);
      loadComments();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du commentaire:",
        error.message,
      );
    }
  };

  return (
    <div className="p-4 border rounded h-full">
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
        <Input
          type="text"
          value={editCommentId !== null ? editedComment : newComment}
          onChange={(e) =>
            editCommentId !== null
              ? setEditedComment(e.target.value)
              : setNewComment(e.target.value)
          }
          placeholder="Ajouter un commentaire..."
        />
        <Button
          onClick={
            editCommentId !== null ? handleEditComment : handleAddComment
          }
        >
          {editCommentId !== null ? "Enregistrer" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
}
