import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { toastUtils } from "../../../../utils/toastUtils";

const CookieDetailsModal = ({
  isOpen,
  onClose,
  cookie,
  mode = "view", // "view" or "edit"
  onSave,
  onDelete,
  isLoading = false,
  error = null,
  isSaving = false,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({
    cookie_value: "",
    isValid: true,
  });
  const [showCookieValue, setShowCookieValue] = useState(false);

  useEffect(() => {
    if (cookie) {
      const cookieData = cookie.data || cookie;
      
      setFormData({
        cookie_value: cookieData.cookie_value || cookieData.cookie_preview || "",
        isValid: cookieData.isValid !== undefined ? cookieData.isValid : true,
      });
    }
  }, [cookie]);

  useEffect(() => {
    if (isOpen) {
      setCurrentMode(mode);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.cookie_value || formData.cookie_value.trim().length === 0) {
      toastUtils.error("Cookie value is required");
      return;
    }
    
    if (isSaving) {
      return;
    }

    const updatedCookie = { ...cookie, ...formData };
    if (onSave) {
      onSave(updatedCookie);
    }
  };


  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#171D41] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 flex-shrink-0">
            <h2 className="text-lg font-medium text-white mb-2">
              Cookie Details
            </h2>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-lg">Loading cookie details...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#171D41] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 flex-shrink-0">
            <h2 className="text-lg font-medium text-white mb-2">
              Cookie Details
            </h2>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-400 text-lg">
                Error loading cookie details: {error?.data?.message || error?.message || 'Unknown error'}
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#9945FF] text-white rounded-lg hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cookie) return null;

  const cookieData = cookie.data || cookie;
  const isActive = cookieData.isActive;
  const isValid = formData.isValid;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#171D41] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 flex-shrink-0 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white mb-2">
                {currentMode === "edit" ? "Edit Cookie Details" : "Cookie Details"}
              </h2>
              <p className="text-sm text-[#AEB9E1]">
                {currentMode === "edit" 
                  ? "Update cookie details and settings"
                  : "View cookie information and settings"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#AEB9E1] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Cookie Details Section */}
            <div className="space-y-6">
              {/* Cookie Value */}
              <div>
                <label className="block text-xs font-inter text-[#FFFFFF]/70 mb-2">
                  Cookie Value <span className="text-red-500">*</span>
                </label>
                {currentMode === "edit" ? (
                  <div className="relative">
                    <textarea
                      value={formData.cookie_value}
                      onChange={(e) => handleInputChange("cookie_value", e.target.value)}
                      className="w-full bg-[#121B36] rounded-lg px-3 py-3 pr-12 text-white text-sm font-inter placeholder-[#AEB9E1] border-none focus:outline-none focus:border-[#14F195] transition-colors min-h-[150px] resize-y"
                      placeholder="Enter cookie value"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCookieValue(!showCookieValue)}
                      className="absolute top-3 right-3 text-[#AEB9E1] hover:text-white"
                    >
                      {showCookieValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  <div className="w-full bg-[#121B36] rounded-lg px-3 py-3 text-white text-sm font-mono break-all">
                    {cookieData.cookie_value || cookieData.cookie_preview || "N/A"}
                  </div>
                )}
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter text-[#FFFFFF]/70 mb-2">
                    Status
                  </label>
                  <div className={`w-full rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive 
                      ? "bg-[#14F19520] text-[#14F195] border border-[#14F19550]"
                      : "bg-[#121B36] text-[#AEB9E1]"
                  }`}>
                    {isActive ? "Active" : "Inactive"}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-inter text-[#FFFFFF]/70 mb-2">
                    Valid
                  </label>
                  {currentMode === "edit" ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.isValid}
                        onChange={(e) => handleInputChange("isValid", e.target.checked)}
                        className="w-4 h-4 rounded bg-[#121B36] border-[#3A3A4E] text-[#14F195] focus:ring-[#14F195]"
                      />
                      <span className="text-sm text-white">
                        {formData.isValid ? "Valid" : "Invalid"}
                      </span>
                    </div>
                  ) : (
                    <div className={`w-full rounded-lg px-3 py-3 text-sm font-medium ${
                      isValid 
                        ? "bg-[#14F19520] text-[#14F195] border border-[#14F19550]"
                        : "bg-[#121B36] text-red-400"
                    }`}>
                      {isValid ? "Valid" : "Invalid"}
                    </div>
                  )}
                </div>
              </div>

              {/* Usage Stats */}
              {currentMode === "view" && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#3A3A4E]">
                  <div>
                    <label className="block text-xs font-inter text-[#FFFFFF]/70 mb-2">
                      Usage Count
                    </label>
                    <div className="w-full bg-[#121B36] rounded-lg px-3 py-3 text-white text-sm">
                      {cookieData.usageCount || 0}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-inter text-[#FFFFFF]/70 mb-2">
                      Last Used
                    </label>
                    <div className="w-full bg-[#121B36] rounded-lg px-3 py-3 text-white text-sm">
                      {cookieData.lastUsed 
                        ? new Date(cookieData.lastUsed).toLocaleString()
                        : "Never"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#3A3A4E]">
              {currentMode === "view" ? (
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-[#121B36] text-white rounded-lg hover:bg-[#1a2338] transition-colors"
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 bg-[#121B36] text-white rounded-lg hover:bg-[#1a2338] transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieDetailsModal;

