import React from "react";

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
    <ul className="list-disc pl-4 overflow-auto h-[60px]">
      {comments.map((comment) => (
        <li key={comment.id} className="mb-4">
          {editCommentId === comment.id ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="border p-2 flex-1"
              />
              <button
                onClick={() => handleEditComment(comment.id)}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={!editedComment.trim()} // désactive le bouton si le commentaire est vide
              >
                Enregistrer
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="flex-1">{comment.content}</span>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    setEditedComment(comment.content) ||
                    setEditCommentId(comment.id)
                  }
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
