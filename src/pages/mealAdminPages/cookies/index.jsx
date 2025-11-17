import React, { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import ReusableFilter from "../../../components/ReusableFilter";
import ReusableTable from "../../../components/ReusableTable";
import ReusablePagination from "../../../components/ReusablePagination";
import CookieDetailsModal from "./features/CookieDetailsModal";
import AddCookieModal from "./features/AddCookieModal";
import StatCard from "./features/dashboard-card";
import ConfirmModal from "../../../components/ConfirmModal";
import PageLoading from "../../../components/PageLoading";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { CookieIcon } from "../../../assets/icons/icons";
import {
  useGetCookiesQuery,
  useGetCookieByIdQuery,
  useCreateCookieMutation,
  useUpdateCookieMutation,
  useActivateCookieMutation,
  useDeactivateCookieMutation,
  useDeleteCookieMutation,
} from "../../../services/admin/adminApi";
import toast from "react-hot-toast";

const CookiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "view",
    cookie: null,
  });
  const [addCookieModalOpen, setAddCookieModalOpen] = useState(false);
  const [deleteConfirmState, setDeleteConfirmState] = useState({
    isOpen: false,
    cookie: null,
  });

  const [filters, setFilters] = useState({
    status: {
      key: "status",
      label: "All Statuses",
      selectedValue: "All Statuses",
      options: [
        { value: "All Statuses", label: "All Statuses" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  });

  // Debounced search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  
  // Debounced filters
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsFilterLoading(true);
    }
    
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsFilterLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearchQuery]);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(debouncedFilters)) {
      setIsFilterLoading(true);
    }
    
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setIsFilterLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [filters, debouncedFilters]);

  // API query parameters
  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: 10,
    };

    if (debouncedSearchQuery) {
      params.search = debouncedSearchQuery;
    }

    if (debouncedFilters.status.selectedValue !== "All Statuses") {
      params.status = debouncedFilters.status.selectedValue;
    }

    return params;
  }, [currentPage, debouncedSearchQuery, debouncedFilters]);

  // Fetch cookies data from API
  const {
    data: cookiesResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetCookiesQuery(queryParams);

  // Mutations
  const [createCookie, { isLoading: isCreating }] = useCreateCookieMutation();
  const [updateCookie, { isLoading: isUpdating }] = useUpdateCookieMutation();
  const [activateCookie, { isLoading: isActivating }] = useActivateCookieMutation();
  const [deactivateCookie, { isLoading: isDeactivating }] = useDeactivateCookieMutation();
  const [deleteCookie, { isLoading: isDeleting }] = useDeleteCookieMutation();

  // Get single cookie data for edit modal
  const cookieId = modalState.cookie?.id || modalState.cookie?._id;
  const {
    data: singleCookieData,
    isLoading: isLoadingSingleCookie,
    error: singleCookieError
  } = useGetCookieByIdQuery(cookieId, {
    skip: !cookieId || !modalState.isOpen || modalState.mode !== "edit"
  });

  // Extract cookies data from API response
  const rawCookiesData = cookiesResponse?.cookies || [];
  const totalCookies = cookiesResponse?.count || 0;

  // Transform API data to match UI expectations
  const cookiesData = useMemo(() => {
    return rawCookiesData.map((cookie) => ({
      id: cookie.id || cookie._id,
      _id: cookie.id || cookie._id,
      name: cookie.cookie_preview || (cookie.cookie_value ? cookie.cookie_value.substring(0, 30) + "..." : "Cookie"),
      cookie_value: cookie.cookie_value || "",
      cookie_preview: cookie.cookie_preview || (cookie.cookie_value ? cookie.cookie_value.substring(0, 20) + "..." : ""),
      isActive: cookie.isActive || false,
      status: cookie.isActive ? "active" : "inactive", // Convert boolean to string for table
      isValid: cookie.isValid !== undefined ? cookie.isValid : true,
      lastUsed: cookie.lastUsed ? new Date(cookie.lastUsed).toLocaleDateString() : "Never",
      usageCount: cookie.usageCount || 0,
      createdAt: cookie.createdAt,
      updatedAt: cookie.updatedAt,
    }));
  }, [rawCookiesData]);

  // Table columns configuration
  const columns = [
    { key: "name", label: "Cookie Name" },
    { key: "cookie_preview", label: "Cookie Value" },
    { key: "status", label: "Status" },
    { key: "usageCount", label: "Usage" },
    { key: "lastUsed", label: "Last Used" },
    { key: "actions", label: "", className: "w-16" },
  ];

  // Handle filter changes
  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        selectedValue: value,
      },
    }));
    setCurrentPage(1);
    setIsFilterLoading(true);
  };

  // Handle search changes
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    if (value !== debouncedSearchQuery) {
      setIsFilterLoading(true);
    }
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle row selection
  const handleRowClick = (row) => {
    setSelectedRow(selectedRow === row.id ? null : row.id);
  };

  // Handle view cookie
  const handleViewCookie = (cookie) => {
    setModalState({
      isOpen: true,
      mode: "view",
      cookie: cookie,
    });
  };

  // Handle edit cookie
  const handleEditCookie = (cookie) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      cookie: cookie,
    });
  };

  // Handle delete cookie
  const handleDeleteCookie = (cookie) => {
    setDeleteConfirmState({
      isOpen: true,
      cookie: cookie,
    });
  };

  const confirmDeleteCookie = async () => {
    if (deleteConfirmState.cookie) {
      try {
        const cookieId = deleteConfirmState.cookie._id || deleteConfirmState.cookie.id;
        await deleteCookie(cookieId).unwrap();
        toast.success("Cookie deleted successfully!");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message || "Failed to delete cookie");
      }
    }
    setDeleteConfirmState({
      isOpen: false,
      cookie: null,
    });
  };

  // Handle add cookie
  const handleAddCookie = async (newCookie) => {
    try {
      await createCookie(newCookie).unwrap();
      toast.success("Cookie created successfully!");
      setAddCookieModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to create cookie");
    }
  };

  // Handle save cookie
  const handleSaveCookie = async (updatedCookie) => {
    try {
      const cookieId = updatedCookie._id || updatedCookie.id;
      const cookieData = {
        cookie_value: updatedCookie.cookie_value,
        isValid: updatedCookie.isValid,
      };
      
      await updateCookie({ cookieId, cookieData }).unwrap();
      toast.success("Cookie updated successfully!");
      setModalState({ isOpen: false, mode: "view", cookie: null });
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to update cookie");
    }
  };

  // Handle status change
  const handleStatusChange = async (row, newStatus) => {
    try {
      const cookieId = row._id || row.id;
      
      if (newStatus === "active") {
        await activateCookie(cookieId).unwrap();
        toast.success("Cookie activated successfully!");
      } else if (newStatus === "inactive") {
        await deactivateCookie(cookieId).unwrap();
        toast.success("Cookie deactivated successfully!");
      }
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Failed to change cookie status");
    }
  };

  // Close modal
  const closeModal = () => {
    setModalState({ isOpen: false, mode: "view", cookie: null });
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const activeCount = rawCookiesData.filter(c => c.isActive).length;
    const inactiveCount = rawCookiesData.filter(c => !c.isActive).length;
    const validCount = rawCookiesData.filter(c => c.isValid !== false).length;
    
    return {
      total: totalCookies || 0,
      active: activeCount,
      inactive: inactiveCount,
      valid: validCount,
    };
  }, [rawCookiesData, totalCookies]);

  // Use API data directly
  const currentData = cookiesData;
  const totalItems = totalCookies;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Show loading state
  if (isLoading) {
    return <PageLoading message="Loading cookies..." />;
  }

  // Show error state
  if (isError) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">
            Error loading cookies: {error?.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  // Fallback to modalState.cookie if single cookie data is not available
  const finalCookieData = singleCookieData?.cookie || modalState.cookie;

  return (
    <div className="p-6">
      {/* Add Cookie Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setAddCookieModalOpen(true)}
          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-white px-6 py-2 font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Cookie
        </button>
      </div>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Cookies" value={stats.total.toString()} icon={CookieIcon} />
        <StatCard
          title="Active Cookies"
          value={stats.active.toString()}
          icon={IoMdCheckmarkCircleOutline}
        />
        <StatCard
          title="Inactive Cookies"
          value={stats.inactive.toString()}
          icon={IoMdCloseCircleOutline}
        />
        <StatCard
          title="Valid Cookies"
          value={stats.valid.toString()}
          icon={CookieIcon}
        />
      </div>

      <div className="flex flex-col bg-[#171D41] rounded-t-lg p-6">
        {/* Header and Filters Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Cookies</h1>

          {/* Search and Filters Section */}
          <div className="flex-1 ml-8">
            <ReusableFilter
              filters={Object.values(filters)}
              onFilterChange={handleFilterChange}
              searchPlaceholder="Search by name, description..."
              onSearchChange={handleSearchChange}
              searchValue={searchQuery}
            />
          </div>
        </div>

        {/* Cookies Table */}
        <div className="bg-[#171D41] rounded-lg border border-[#EDEDED33] p-4 relative">
          <LoadingOverlay 
            isLoading={isLoading || isFilterLoading}
            message={
              isFilterLoading 
                ? (searchQuery !== debouncedSearchQuery ? "Searching..." : "Applying filters...") 
                : "Loading cookies..."
            }
          />
          
          {currentData.length > 0 ? (
            <ReusableTable
              columns={columns}
              data={currentData}
              onRowClick={handleRowClick}
              selectedRow={selectedRow}
              actions={true}
              onView={handleViewCookie}
              onEdit={handleEditCookie}
              onDelete={handleDeleteCookie}
              onStatusChange={handleStatusChange}
              tableType="cookies"
            />
          ) : (
            <div className="bg-[#171D41] rounded-lg border border-[#EDEDED33] p-8">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-[#AEB9E1] text-6xl mb-4">🍪</div>
                <h3 className="text-white text-lg font-semibold mb-2">No Cookies Found</h3>
                <p className="text-[#AEB9E1] text-sm text-center max-w-md">
                  {searchQuery || debouncedFilters.status.selectedValue !== "All Statuses"
                    ? "No cookies match your current search criteria. Try adjusting your filters or search terms."
                    : "There are no cookies available at the moment. Add a new cookie to get started."
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-[#171D41] rounded-b-lg px-3 pb-3">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            showPageInfo={true}
          />
        </div>
      )}

      {/* Cookie Details Modal */}
      <CookieDetailsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        cookie={finalCookieData}
        mode={modalState.mode}
        onSave={handleSaveCookie}
        onDelete={handleDeleteCookie}
        isLoading={isLoadingSingleCookie}
        error={singleCookieError}
        isSaving={isUpdating}
      />

      {/* Add Cookie Modal */}
      <AddCookieModal
        isOpen={addCookieModalOpen}
        onClose={() => setAddCookieModalOpen(false)}
        onAddCookie={handleAddCookie}
        isLoading={isCreating}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmState.isOpen}
        onClose={() => setDeleteConfirmState({ isOpen: false, cookie: null })}
        onConfirm={confirmDeleteCookie}
        title="Are you sure?"
        itemName={deleteConfirmState.cookie?.cookie_preview || deleteConfirmState.cookie?.name || "Cookie"}
        itemDescription="This cookie will be permanently deleted from the system"
        itemDate={`Created ${
          deleteConfirmState.cookie?.createdAt 
            ? new Date(deleteConfirmState.cookie.createdAt).toLocaleDateString()
            : "Unknown"
        }`}
        confirmButtonText="Delete Cookie"
        type="delete"
      />
    </div>
  );
};

export default CookiesPage;

