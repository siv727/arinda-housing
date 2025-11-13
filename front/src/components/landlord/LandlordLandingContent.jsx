import React from "react";
import overviewMockUp from "../../assets/illustrations/phone-mockup-1.png";
import messageMockUp from "../../assets/illustrations/phone-mockup-2.png";
import rentalMockUp from "../../assets/illustrations/phone-mockup-3.png";
import Footer from "../common/Footer";
import Steps from "./Steps";

const LandlordLandingContent = () => {
  return (
    <div className="flex flex-col">
      {/* LANDING HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[100vh] flex items-center justify-center pt-25 px-4 overflow-hidden bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA] mt-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
          <div className="text-center m-5 mx-auto absolute -top-24 inset-x-0 border-[1.5px] border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px] bg-white/10">
            <i className="fa-regular fa-comments-dollar pr-3"></i>
            Rent. Earn. Simplified
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
            <div className="flex flex-col gap-y-10">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                List Your<br></br> Property & Earn More <br></br>
              </h1>

              <p className="text-lg md:text-[20px] text-[#666666] max-w-3xl mx-auto">
                Connect with verified students seeking quality housing. Our
                platform streamlines property management while maximizing your
                rental income through our trusted network.
              </p>

              <a href="/landlord/register">
                <button className="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-[#F35E27] to-[#ff792b] w-full text-white p-4 rounded-[6px] text-[18px] font-semibold hover:bg-[#892728] transition shadow-lg">
                  <i className="fa-solid fa-flag-checkered"></i>
                  <span>List Your Property Now</span>
                </button>
              </a>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-[30px] font-bold text-[#333333]">
                    10,000+
                  </div>
                  <div className="text-[14px] text-[#666666]">
                    Verified Properties
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[30px] font-bold text-[#333333]">
                    50,000+
                  </div>
                  <div className="text-[14px] text-[#666666]">
                    Happy Students
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[30px] font-bold text-[#333333]">
                    200+
                  </div>
                  <div className="text-[14px] text-[#666666]">
                    Cities Covered
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white border border-black rounded w-full h-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="about"
        className="flex flex-col items-center justify-center py-15 bg-[#FFFDFA] relative overflow-hidden"
      >
        <div className="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
          <i className="fa-regular fa-face-thinking pr-3"></i>
          Why Choose Arinda
        </div>

        <div className="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
          Everything You Need to{" "}
          <span className="bg-[#ffeae0] px-2 text-[#F35E27]">Succeed</span>
        </div>

        <div className=" md:text-[20px] text-center flex text-[#666666] ">
          Comprehensive tools and support to maximize your rental income and
          minimize vacancy periods
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 text-center my-10">
          <div className="flex flex-col items-center w-64 gap-y-3">
            <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
              <i className="fa-solid fa-badge-check text-[20px]"></i>
            </div>

            <div className="text-[20px] font-bold text-[#333333]">
              Verified Tenants
            </div>
            <div className="text-[14px] text-[#666666]">
              Every property is thoroughly verified with detailed information,
              high-quality photos, and accurate location data.
            </div>
          </div>

          <div className="flex flex-col items-center w-64 gap-y-3">
            <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
              <i className="fa-solid fa-magnifying-glass-location text-[20px]"></i>
            </div>

            <div className="text-[20px] font-bold text-[#333333]">
              Smart Analytics
            </div>
            <div className="text-[14px] text-[#666666]">
              Advanced filters and map-based navigation help you find rentals
              that match your budget and school proximity.
            </div>
          </div>

          <div className="flex flex-col items-center w-64 gap-y-3">
            <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
              <i className="fa-solid fa-book-sparkles text-[20px]"></i>
            </div>

            <div className="text-[20px] font-bold text-[#333333]">
              Community Insights
            </div>
            <div className="text-[14px] text-[#666666]">
              Access student reviews, neighborhood info, and popular amenities
              to make informed decisions and improve tenant satisfaction.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="flex flex-col items-center justify-center py-15 bg-gradient-to-b from-[#FFFDFA] via-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden"
      >
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 "></div> */}
        <div className="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
          <i className="fa-regular fa-arrow-progress pr-3"></i>
          Simple Process
        </div>

        <div className="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
          How <span className="bg-[#ffeae0] px-2 text-[#F35E27]">Arinda</span>{" "}
          Works
        </div>

        <div className=" max-w-[750px] md:text-[20px] text-center flex text-[#666666]">
          Everything you need to list, manage, and rent out your properties
          efficiently and securely.
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-20 ">
          <div className="pt-2">
            <Steps />
          </div>
        </div>
      </section>

      {/* PROPERTY OWNERS SECTION */}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-t from-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
        <div className="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
          <i className="fa-regular fa-mobile pr-3"></i>
          Your Rentals, Simplified
        </div>

        <div className="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
          All the tools you need to manage<br></br> your properties,{" "}
          <span className="bg-[#ffeae0] px-2 text-[#F35E27]">all</span> in one
          app
        </div>

        <div className=" max-w-[750px] md:text-[20px] text-center flex text-[#666666] mb-10">
          Easily list, manage, and track your rental properties while maximizing
          income and minimizing vacancy—all in one place.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-16 text-center">
          <div className="flex flex-col items-center w-72">
            <div className="flex items-end bg-[#ffeae0] rounded-[8px] h-90 px-6">
              <img
                src={overviewMockUp}
                alt="cit-u"
                className="object-contain"
              />
            </div>

            <div className="text-[20px] font-bold text-[#333333] mt-5">
              Landlord Panel
            </div>
            <div className="text-[14px] text-[#666666]">
              Easily manage all your properties in one place
            </div>
          </div>

          <div className="flex flex-col items-center w-76 ">
            <div className="flex items-end bg-[#ffeae0] rounded-[8px] h-90 px-6">
              <img src={rentalMockUp} alt="cit-u" className="object-contain" />
            </div>

            <div className="text-[20px] font-bold text-[#333333] mt-5">
              Current Rentals
            </div>
            <div className="text-[14px] text-[#666666]">
              Track occupancy, rental income, and lease details
            </div>
          </div>

          <div className="flex flex-col items-center w-72 ">
            <div className="flex items-end bg-[#ffeae0] rounded-[8px] h-90 px-6">
              <img src={messageMockUp} alt="cit-u" className="object-contain" />
            </div>

            <div className="text-[20px] font-bold text-[#333333] mt-5">
              Messages
            </div>
            <div className="text-[14px] text-[#666666]">
              Communicate quickly with tenants and support
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SELECTION */}
      <section className="relative" id="download-app">
        <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] transform -skew-y-2 absolute -top-4 -bottom-10 inset-0 "></div>

        <div className="relative mx-auto items-center justify-center flex flex-col text-center py-8">
          <div className="border border-[#FFF5F2] rounded-full w-fit my-4 px-4 py-1 text-[#FFEBE4] font-medium text-[12px] bg-white/20">
            <i className="fa-regular fa-globe pr-3"></i>
            Join Our Network
          </div>

          <div className="md:text-6xl text-5xl  font-bold text-white text-center my-8 ">
            Ready to Maximize Your Rental Income?
          </div>

          <div className=" text-center flex text-white md:text-[20px]">
            Join thousands of students who have found safe, affordable housing
            through Arinda
          </div>

          <div className="flex flex-col md:flex-row font-semibold gap-8 items-center my-12">
            <button className="bg-[white] rounded-[6px] px-6 py-3 text-[#F35E27] cursor-pointer shadow-xl">
              <i className="fa-solid fa-magnifying-glass-location pr-3"></i>
              Start Listing Now
            </button>

            <button className="bg-transparent outline-2 outline-[white] rounded-[6px] px-6 py-3 text-white cursor-pointer">
              <i className="fa-solid fa-file-arrow-down pr-3"></i>
              Download App
            </button>
          </div>
        </div>
      </section>
      <div className="relative h-5 bg-gradient-to-b from-[#ff792b] to-[#F6F9FC] max-w-screen overflow-hidden"></div>
      <Footer />
    </div>
  );
};

export default LandlordLandingContent;
