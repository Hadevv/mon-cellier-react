import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommentList({
  comments,
  editCommentId,
  setEditCommentId,
  newComment,
  setNewComment,
  editedComment,
  setEditedComment,
  handleEditComment,
  handleDeleteComment,
}) {
  return (
    <ul className="list-disc pl-4 overflow-auto h-[110px]">
      {comments.map((comment) => (
        <li key={comment.id} className="mb-4">
          {editCommentId === comment.id ? (
            <div className="">
              <Input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <Button
                onClick={() => handleEditComment(comment.id)}
                disabled={!editedComment.trim()} // désactive le bouton si le commentaire est vide
              >
                Enregistrer
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="flex-1">{comment.content}</span>
              <div className="space-x-2">
                <Button
                  onClick={() =>
                    setEditedComment(comment.content) ||
                    setEditCommentId(comment.id)
                  }
                >
                  Modifier
                </Button>
                <Button variant="destructive"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
