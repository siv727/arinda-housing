import { useState } from "react";
import TenantRegisterForm from "../components/auth/TenantRegisterForm";
import LandlordRegisterForm from "../components/auth/LandlordRegisterForm";
import Navbar from "../components/common/Navbar";
import OrangeHatCard from "../components/common/OrangeHatCard";
import TabToggle from "../components/common/TabToggle";

const Register = () => {
  const [activeTab, setActiveTab] = useState("tenant");

  const description =
    activeTab === "tenant"
      ? "Join us and start managing your listings with ease"
      : "Join Arinda's hosting platform to list your properties.";

  return (
    <>
      <Navbar userType={activeTab} />
      <div className="min-h-screen pt-18 flex flex-col items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] p-4">
        
        {/* Toggle Component */}
        <div className="mb-8 mt-8">
          <TabToggle activeTab={activeTab} onTabChange={setActiveTab} fixed={false} />
        </div>

        <OrangeHatCard>
          <h1 className="text-3xl font-bold pt-8 py-4 text-center">
            Create an account
          </h1>
          <p className="text-center mb-6">{description}</p>
          <hr />
          
          {/* Conditionally render form based on activeTab */}
          {activeTab === "tenant" ? (
            <TenantRegisterForm />
          ) : (
            <LandlordRegisterForm />
          )}

          <div className="text-[14px] text-center text-gray-600 mb-6">
            Already have an account?
            <a
              href="/login"
              className="text-[#DD4912] hover:underline font-semibold pl-2"
            >
              Sign In
            </a>
          </div>
        </OrangeHatCard>
      </div>
    </>
  );
};

export default Register;
