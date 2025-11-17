import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toastUtils } from "../../../../utils/toastUtils";

const AddCookieModal = ({ isOpen, onClose, onAddCookie, isLoading = false }) => {
  const [formData, setFormData] = useState({
    cookie_value: "",
    isActive: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        cookie_value: "",
        isActive: false,
      });
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.cookie_value || formData.cookie_value.trim().length === 0) {
      toastUtils.error("Cookie value is required");
      return;
    }
    
    if (formData.cookie_value && !isLoading) {
      onAddCookie(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      cookie_value: "",
      isActive: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#171D41] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex-shrink-0 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-white mb-2">Add New Cookie</h2>
            <p className="text-sm text-[#AEB9E1]">
              Create a new cookie record. Fill in all required fields to add new cookie
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[#AEB9E1] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Cookie Value */}
          <div>
            <label className="block text-xs font-inter text-[#FFFFFF]/70 mb-2">
              Cookie Value <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.cookie_value}
              onChange={(e) => handleInputChange("cookie_value", e.target.value)}
              className="w-full bg-[#121B36] border-none rounded-lg px-3 py-3 text-white text-sm font-inter placeholder-[#AEB9E1] focus:outline-none focus:border-[#14F195] transition-colors min-h-[150px] resize-y"
              placeholder="Enter cookie value"
              required
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange("isActive", e.target.checked)}
              className="w-4 h-4 rounded bg-[#121B36] border-[#3A3A4E] text-[#14F195] focus:ring-[#14F195] focus:ring-offset-0"
            />
            <label htmlFor="isActive" className="text-sm text-white cursor-pointer">
              Activate this cookie immediately
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#3A3A4E]">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-[#121B36] text-white rounded-lg hover:bg-[#1a2338] transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Cookie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCookieModal;

