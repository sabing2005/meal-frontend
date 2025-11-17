import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import ActionsMenu from "../pages/mealAdminPages/tickets/features/ActionsMenu";

const ReusableTable = ({
  columns = [],
  data = [],
  onRowClick,
  selectedRow = null,
  actions = null,
  onView = null,
  onEdit = null,  
  onDelete = null,
  onResendViaEmail = null,
  onOpenInChat = null, // New prop for open in chat callback
  onStatusChange = null, // New prop for status change callback
  tableType = "tickets", // "orders", "tickets", "staff"
  isLoading = false, // New prop for loading state
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState("bottom");
  const [activeStatusDropdown, setActiveStatusDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if click is outside any actions menu
      if (activeMenu && !event.target.closest("[data-actions-container]")) {
        setActiveMenu(null);
      }
      // Close status dropdown if click is outside any status dropdown
      if (
        activeStatusDropdown &&
        !event.target.closest("[data-status-container]")
      ) {
        setActiveStatusDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu, activeStatusDropdown]);

  const handleMenuClick = (e, rowId, index) => {
    e.stopPropagation();

    // Determine menu position based on row position
    const isFirstRow = index === 0;
    const isLastRow = index === data.length - 1;
    const isSecondLastRow = index === data.length - 2;

    if (isFirstRow) {
      setMenuPosition("bottom");
    } else if (isLastRow || isSecondLastRow) {
      setMenuPosition("top");
    } else {
      setMenuPosition("bottom");
    }

    setActiveMenu(activeMenu === rowId ? null : rowId);
  };

  const handleView = (row) => {
    console.log("ReusableTable handleView called with:", row);
    if (onView) {
      console.log("Calling onView callback with:", row);
      onView(row);
    }
    setActiveMenu(null);
  };

  const handleEdit = (row) => {
    console.log("ReusableTable handleEdit called with:", row);
    if (onEdit) {
      console.log("Calling onEdit callback with:", row);
      onEdit(row);
    }
    setActiveMenu(null);
  };

  const handleDelete = (row) => {
    console.log("ReusableTable handleDelete called with:", row);
    if (onDelete) {
      console.log("Calling onDelete callback with:", row);
      onDelete(row);
    }
    setActiveMenu(null);
  };

  const handleResendViaEmail = (row) => {
    console.log("ReusableTable handleResendViaEmail called with:", row);
    if (onResendViaEmail) {
      console.log("Calling onResendViaEmail callback with:", row);
      onResendViaEmail(row);
    }
    setActiveMenu(null);
  };

  const handleOpenInChat = (row) => {
    console.log("ReusableTable handleOpenInChat called with:", row);
    if (onOpenInChat) {
      console.log("Calling onOpenInChat callback with:", row);
      onOpenInChat(row);
    }
    setActiveMenu(null);
  };

  const handleStatusClick = (e, rowId) => {
    e.stopPropagation();
    setActiveStatusDropdown(activeStatusDropdown === rowId ? null : rowId);
  };

  const handleStatusChange = (e, row, newStatus) => {
    e.stopPropagation(); // Prevent row click from triggering
    if (onStatusChange) {
      onStatusChange(row, newStatus);
    }
    setActiveStatusDropdown(null);
  };

  // Define status progression for tickets
  const getTicketStatusProgression = (currentStatus) => {
    const progression = {
      OPEN: ["FULFILLED"], // Direct from OPEN to FULFILLED
      FULFILLED: [], // No further progression - no dropdown options
      RESOLVED: [], // No further progression - RESOLVED maps to FULFILLED in frontend
    };
    return progression[currentStatus] || [];
  };

  // Define status options for different table types
  const getStatusOptions = (tableType, currentStatus = null) => {
    const statusOptions = {
      orders: [
        {
          value: "PENDING",
          label: "Pending",
          color: "text-[#FDB52A]",
          bg: "bg-[#FDB52A33]",
          border: "border-[#FDB52A]",
        },
        {
          value: "PLACED",
          label: "Placed",
          color: "text-[#14F195]",
          bg: "bg-[#14F19533]",
          border: "border-[#14F195]",
        },
        {
          value: "CANCELLED",
          label: "Cancelled",
          color: "text-[#6B7280]",
          bg: "bg-[#6B728033]",
          border: "border-[#6B7280]",
        },
      ],
      tickets: [
        {
          value: "ORDERING",
          label: "Ordering",
          color: "text-[#FDB52A]",
          bg: "bg-[#FDB52A33]",
          border: "border-[#FDB52A]",
        },
        {
          value: "FULFILLED",
          label: "Fulfilled",
          color: "text-[#10B981]",
          bg: "bg-[#10B98133]",
          border: "border-[#10B981]",
        },
      ],
      staff: [
        {
          value: "active",
          label: "Active",
          color: "text-[#14F195]",
          bg: "bg-[#14F19533]",
          border: "border-[#14F195]",
        },
        {
          value: "inactive",
          label: "Inactive",
          color: "text-[#EF4444]",
          bg: "bg-[#EF444433]",
          border: "border-[#EF4444]",
        },
      ],
      cookies: [
        {
          value: "active",
          label: "Active",
          color: "text-[#14F195]",
          bg: "bg-[#14F19533]",
          border: "border-[#14F195]",
        },
        {
          value: "inactive",
          label: "Inactive",
          color: "text-[#EF4444]",
          bg: "bg-[#EF444433]",
          border: "border-[#EF4444]",
        },
      ],
    };
    
    // For tickets, return progressive options based on current status
    if (tableType === "tickets" && currentStatus) {
      const availableStatuses = getTicketStatusProgression(currentStatus);
      const allTicketStatuses = statusOptions.tickets;
      
      // If current status has available progressions, show only those options
      if (availableStatuses.length > 0) {
        return allTicketStatuses.filter(status => 
          availableStatuses.includes(status.value)
        );
      }
      
      // If no progression available (like FULFILLED or CANCELLED), return empty array
      return [];
    }
    
    return statusOptions[tableType] || statusOptions.orders;
  };

  const getStatusBadge = (status, row) => {
    const statusConfig = {
      // Order statuses (uppercase from API)
      PLACED: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Placed",
        border: "border border-[#14F195]",
      },
      PENDING: {
        bg: "bg-[#FDB52A33]",
        text: "text-[#FDB52A]",
        label: "Pending",
        border: "border border-[#FDB52A]",
      },
      CANCELLED: {
        bg: "bg-[#6B728033]",
        text: "text-[#6B7280]",
        label: "Cancelled",
        border: "border border-[#6B7280]",
      },
      // Legacy lowercase support
      fulfilled: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Fulfilled",
        border: "border border-[#14F195]",
      },
      processing: {
        bg: "bg-[#3B82F633]",
        text: "text-[#3B82F6]",
        label: "Processing",
        border: "border border-[#3B82F6]",
      },
      pending: {
        bg: "bg-[#FDB52A33]",
        text: "text-[#FDB52A]",
        label: "Pending",
        border: "border border-[#FDB52A]",
      },
      refunded: {
        bg: "bg-[#EF444433]",
        text: "text-[#EF4444]",
        label: "Refunded",
        border: "border border-[#EF4444]",
      },
      cancelled: {
        bg: "bg-[#6B728033]",
        text: "text-[#6B7280]",
        label: "Cancelled",
        border: "border border-[#6B7280]",
      },
      paid: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Paid",
        border: "border border-[#14F195]",
      },
      // Ticket statuses (uppercase from API)
      ORDERING: {
        bg: "bg-[#FDB52A33]",
        text: "text-[#FDB52A]",
        label: "Ordering",
        border: "border border-[#FDB52A]",
      },
      ORDERED_SUCCESSFULLY: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Ordered Successfully",
        border: "border border-[#14F195]",
      },
      IN_PROGRESS: {
        bg: "bg-[#3B82F633]",
        text: "text-[#3B82F6]",
        label: "Dispatch",
        border: "border border-[#3B82F6]",
      },
      FULFILLED: {
        bg: "bg-[#10B98133]",
        text: "text-[#10B981]",
        label: "Fulfilled",
        border: "border border-[#10B981]",
      },
      CANCELLED_TICKET: {
        bg: "bg-[#F59E0B33]",
        text: "text-[#F59E0B]",
        label: "Cancelled",
        border: "border border-[#F59E0B]",
      },
      // Legacy status mappings for tickets
      OPEN: {
        bg: "bg-[#EF444433]",
        text: "text-[#EF4444]",
        label: "Open",
        border: "border border-[#EF4444]",
      },
      RESOLVED: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Resolved",
        border: "border border-[#14F195]",
      },
      // Legacy lowercase support
      "in progress": {
        bg: "bg-[#3B82F633]",
        text: "text-[#3B82F6]",
        label: "In Progress",
        border: "border border-[#3B82F6]",
      },
      resolved: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Resolved",
        border: "border border-[#14F195]",
      },
      open: {
        bg: "bg-[#EF444433]",
        text: "text-[#EF4444]",
        label: "Open",
        border: "border border-[#EF4444]",
      },
      closed: {
        bg: "bg-[#6B728033]",
        text: "text-[#6B7280]",
        label: "Closed",
        border: "border border-[#6B7280]",
      },
      // Staff statuses
      active: {
        bg: "bg-[#14F19533]",
        text: "text-[#14F195]",
        label: "Active",
        border: "border border-[#14F195]",
      },
      inactive: {
        bg: "bg-[#EF444433]",
        text: "text-[#EF4444]",
        label: "Inactive",
        border: "border border-[#EF4444]",
      },
    };

    // Handle special case for cancelled tickets
    let config = statusConfig[status] || statusConfig[status.toLowerCase()];
    
    // If status is CANCELLED and we're dealing with tickets, use CANCELLED_TICKET
    if (status === "CANCELLED" && tableType === "tickets" && !config) {
      config = statusConfig.CANCELLED_TICKET;
    }
    
    // Fallback to PENDING if no config found
    if (!config) {
      config = statusConfig.PENDING;
    }

    // For orders, show static badge without dropdown
    if (tableType === "orders") {
      return (
        <div className={`inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-[10px] font-medium min-w-[100px] ${
          config.bg
        } ${config.text} ${config.border || ""}`}>
          {config.label}
        </div>
      );
    }

    // For other table types (tickets, staff), show dropdown only if options available
    const statusOptions = getStatusOptions(tableType, status);

    // If no status options available (like FULFILLED or CANCELLED), show static badge
    if (statusOptions.length === 0) {
      return (
        <div className={`inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-[10px] font-medium min-w-[100px] ${
          config.bg
        } ${config.text} ${config.border || ""}`}>
          {config.label}
        </div>
      );
    }

    return (
      <div className="relative" data-status-container>
        <button
          onClick={(e) => handleStatusClick(e, row.id)}
          className={`inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-[10px] font-medium min-w-[100px] cursor-pointer hover:opacity-80 transition-opacity ${
            config.bg
          } ${config.text} ${config.border || ""}`}
        >
          {config.label}
          <ChevronDown className="w-3 h-3" />
        </button>

        {activeStatusDropdown === row.id && (
          <div className="absolute top-full left-0 mt-1 bg-[#171D41] border border-[#3A3A4E] rounded-lg shadow-xl z-20 min-w-[120px]">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={(e) => handleStatusChange(e, row, option.value)}
                className={`w-full text-left px-3 py-2 text-[10px] font-medium hover:bg-[#3A3A4E] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  status === option.value || status.toLowerCase() === option.value.toLowerCase()
                    ? `${option.color} ${option.bg}`
                    : "text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDiscount = (discount) => {
    return `${discount}%`;
  };

  const renderCellValue = (column, value, row) => {
    switch (column.key) {
      case "status":
        return getStatusBadge(value, row);
      case "amount":
        return formatCurrency(value);
      case "discount":
        return formatDiscount(value);
      case "actions":
        return (
          <div className="relative" data-actions-container>
            <button
              onClick={(e) => handleMenuClick(e, row.id, data.indexOf(row))}
              className="p-2 hover:bg-[#2A2A3E] rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-[#AEB9E1]" />
            </button>

            <ActionsMenu
              isOpen={activeMenu === row.id}
              onClose={() => setActiveMenu(null)}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onResendViaEmail={handleResendViaEmail}
              onOpenInChat={handleOpenInChat}
              position={menuPosition}
              rowData={row}
              tableType={tableType}
            />
          </div>
        );
      default:
        // Handle objects that might be passed as values
        if (value && typeof value === 'object' && !React.isValidElement(value)) {
          // If it's an object with id and email, display the email
          if (value.email) {
            return value.email;
          }
          // If it's an object with a name property, display the name
          if (value.name) {
            return value.name;
          }
          // If it's an object with a label property, display the label
          if (value.label) {
            return value.label;
          }
          // For any other object, convert to string representation
          return JSON.stringify(value);
        }
        return value;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#EDEDED33]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left py-3 px-2 text-[10px] font-semibold text-white font-inter ${
                  column.className || ""
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 px-2 text-center"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14F195]"></div>
                  <div className="text-[#AEB9E1] text-sm font-medium">
                    Loading...
                  </div>
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                onClick={() => onRowClick && onRowClick(row)}
                className={`border-b border-[#EDEDED33] hover:bg-[#0A1330] hover:rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedRow === row.id ? "bg-[#0A1330]" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-3 px-2 text-[10px] text-[#AEB9E1] font-medium font-inter ${
                      column.className || ""
                    }`}
                  >
                    {renderCellValue(column, row[column.key], row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 px-2 text-center"
              >
                <div className="text-[#AEB9E1] text-sm font-medium">
                  No data found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
