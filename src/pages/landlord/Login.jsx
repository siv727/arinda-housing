import LoginForm from "../../components/auth/LoginForm";
import Navbar from "../../components/common/Navbar";
import OrangeHatCard from "../../components/common/OrangeHatCard";

const LandlordLogin = () => {
  const description =
    "Your student rentals, your dashboard—log in and manage everything in one place.";

  return (
    <>
      <Navbar userType="landlord" />
      <div className="min-h-screen flex flex-col pt-12 items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA]">
        <OrangeHatCard>
          <h1 className="text-3xl font-bold pt-8 py-4 text-center">
            Login with your Email
          </h1>
          <p className="text-center mb-6 ">{description}</p>
          <hr></hr>
          <LoginForm userType="landlord" />
          <div class=" text-[14px] text-center text-gray-600 mb-6">
            Don’t have an account?
            <a
              href="/landlord/register"
              class="text-[#DD4912] hover:underline font-semibold pl-2"
            >
              Sign Up
            </a>
          </div>
        </OrangeHatCard>
      </div>
    </>
  );
};

export default LandlordLogin;
