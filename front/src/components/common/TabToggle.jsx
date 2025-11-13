const TabToggle = ({ activeTab, onTabChange, fixed = true }) => {
  return (
    <div className={fixed ? "fixed top-20 left-1/2 -translate-x-1/2 z-40" : ""}>
      <div className="bg-white/90 backdrop-blur-md border-2 border-[#EAD1C7] rounded-full p-1.5 shadow-lg flex gap-1">
        <button
          onClick={() => onTabChange("tenant")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
            activeTab === "tenant"
              ? "bg-gradient-to-r from-[#F35E27] to-[#ff792b] text-white shadow-md"
              : "text-[#666666] hover:text-[#F35E27]"
          }`}
        >
          <i className="fa-regular fa-user pr-2"></i>
          For Tenants
        </button>
        <button
          onClick={() => onTabChange("landlord")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
            activeTab === "landlord"
              ? "bg-gradient-to-r from-[#F35E27] to-[#ff792b] text-white shadow-md"
              : "text-[#666666] hover:text-[#F35E27]"
          }`}
        >
          <i className="fa-regular fa-user-tie pr-2"></i>
          For Landlords
        </button>
      </div>
    </div>
  );
};

export default TabToggle;
