import React from "react";
import { Eye, Edit, Trash2, MessageCircle } from "lucide-react";
import { EditIcon } from "../../../../assets/icons/icons";

const ActionsMenu = ({
  isOpen,
  onClose,
  onView,
  onEdit,
  onDelete,
  onOpenInChat,
  position = "bottom",
  rowData = null,
  tableType = "tickets",
}) => {
  console.log("ActionsMenu props:", {
    isOpen,
    onView,
    onEdit,
    onDelete,
    rowData,
  });

  if (!isOpen) return null;

  const handleViewClick = () => {
    console.log("View clicked, calling onView with:", rowData);
    onView(rowData);
    onClose();
  };

  const handleEditClick = () => {
    console.log("Edit clicked, calling onEdit with:", rowData);
    onEdit(rowData);
    onClose();
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked, calling onDelete with:", rowData);
    onDelete(rowData);
    onClose();
  };

  const handleOpenInChatClick = () => {
    console.log("Open in Chat clicked, calling onOpenInChat with:", rowData);
    onOpenInChat(rowData);
    onClose();
  };


  // Define which actions to show based on table type
  const getActionsToShow = () => {
    switch (tableType) {
      case "orders":
        return ["view"]; // Only show View for orders
      case "tickets":
        return ["view", "openInChat"]; // Show View and Open in Chat for tickets
      case "staff":
        return ["edit", "delete"];
      default:
        return ["view", "edit", "delete"];
    }
  };

  const actionsToShow = getActionsToShow();

  return (
    <div
      className={`absolute z-50 ${
        tableType === "tickets" ? "w-40" : "w-32"
      } bg-[#060B27] border border-[#3A3A4E] rounded-lg shadow-xl py-1 ${
        position === "top" ? "bottom-full mb-2" : "top-full mt-2"
      } right-0`}
    >
      {actionsToShow.includes("view") && (
        <button
          onClick={handleViewClick}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-[#3A3A4E] transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      )}

      {actionsToShow.includes("edit") && (
        <button
          onClick={handleEditClick}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-[#3A3A4E] transition-colors"
        >
          <EditIcon className="w-4 h-4" />
          Edit
        </button>
      )}

      {actionsToShow.includes("delete") && (
        <button
          onClick={handleDeleteClick}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-[#3A3A4E] transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      )}

      {actionsToShow.includes("openInChat") && (
        <button
          onClick={handleOpenInChatClick}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-[#3A3A4E] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Open in Chat
        </button>
      )}

    </div>
  );
};

export default ActionsMenu;
