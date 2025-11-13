import { useState } from "react"; 
import Navbar from "../components/common/Navbar";
import TabToggle from "../components/common/TabToggle";
import LandlordLandingContent from "../components/landlord/LandlordLandingContent";
import TenantLandingContent from "../components/tenant/TenantLandingContent";

export default function Landing() {
  const [activeTab, setActiveTab] = useState("tenant");

  return (
    <>
      {/* NAVBAR */}
      <Navbar userType={activeTab} /> 
      
      {/* TOGGLE COMPONENT */}
      <TabToggle activeTab={activeTab} onTabChange={setActiveTab} />

      {/* LANDING CONTENT */}
      {activeTab === "landlord" && <LandlordLandingContent />}
      {activeTab === "tenant" && <TenantLandingContent />}
    </>
  );
}
