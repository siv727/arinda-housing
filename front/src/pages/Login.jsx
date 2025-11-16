import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/common/Navbar";
import OrangeHatCard from "../components/common/OrangeHatCard";

const Login = () => {
  const description = "Welcome back! Sign in to access your account and manage everything in one place.";

  return (
    <>
      <Navbar userType="tenant" />
      <div className="min-h-screen pt-12 flex flex-col items-center justify-center bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] p-4">
        <OrangeHatCard>
          <h1 className="text-3xl font-bold pt-8 py-4 text-center">
            Login with your Email
          </h1>
          <p className="text-center mb-6">{description}</p>
          <hr />
          <LoginForm />
          <div className="text-[14px] text-center text-gray-600 mb-6">
            Don't have an account?
            <a
              href="/register"
              className="text-[#DD4912] hover:underline font-semibold pl-2"
            >
              Sign Up
            </a>
          </div>
        </OrangeHatCard>
      </div>
    </>
  );
};

export default Login;
