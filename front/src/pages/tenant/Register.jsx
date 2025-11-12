import React from "react";
import TenantRegisterForm from "../../components/auth/TenantRegisterForm";
import Navbar from "../../components/common/Navbar";
import OrangeHatCard from "../../components/common/OrangeHatCard";

const TenantRegister = () => {
  const description = "Join us and start managing your listings with ease";
  return (
    <>
  <Navbar userType="tenant" />
      <div className="min-h-screen pt-18 flex flex-col items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] p-4">
        <OrangeHatCard>
          <h1 className="text-3xl font-bold pt-8 py-4 text-center">
            Create an account
          </h1>
          <p className="text-center mb-6 ">{description}</p>
          <hr></hr>
          <TenantRegisterForm />
          <div class=" text-[14px] text-center text-gray-600 mb-6">
            Already have an account?
            <a
              href="/tenant/login"
              class="text-[#DD4912] hover:underline font-semibold pl-2"
            >
              Sign In
            </a>
          </div>
        </OrangeHatCard>
      </div>
    </>
  );
};

export default TenantRegister;
