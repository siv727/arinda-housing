import React from 'react'
import citLogo from "../../assets/universities/cit-logo.png";
import delaLogo from "../../assets/universities/delasalle-logo.png";
import ucLogo from "../../assets/universities/uc-logo.png";
import uscLogo from "../../assets/universities/usc-logo.png";
import usjrLogo from "../../assets/universities/usjr-logo.png";
import phoneMockup from "../../assets/illustrations/phone-mockup.png";
import Footer from "../common/Footer";
import Steps from "./Steps";

const TenantLandingContent = () => {
  return (
    <div className="flex flex-col">
      {/* TENANT HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[100vh] flex items-center justify-center pt-25 px-4 overflow-hidden bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
          <div className="text-center m-5 mx-auto absolute -top-24 inset-x-0 border-[1.5px] border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px] bg-white/10">
            <i className="fa-regular fa-home mr-2"></i>
            Student Housing, Simplified
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
            <div className="flex flex-col gap-y-10">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Find Your<br></br> Perfect Student Housing <br></br>
              </h1>

              <p className="text-lg md:text-[20px] text-[#666666] max-w-3xl mx-auto">
                Skip the door-to-door search. Discover safe and
                affordable rentals designed specifically for students moving to
                new cities.
              </p>

              <a href="/register">
                <button className="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-[#F35E27] to-[#ff792b] w-full text-white p-4 rounded-[6px] text-[18px] font-semibold hover:bg-[#892728] transition shadow-lg">
                  <i className="fa-solid fa-flag-checkered"></i>
                  <span>Start Your Search</span>
                </button>
              </a>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-[30px] font-bold text-[#333333]">
                    10,000+
                  </div>
                  <div className="text-[14px] text-[#666666]">
                    Properties Listed
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[30px] font-bold text-[#333333]">
                    50,000+
                  </div>
                  <div className="text-[14px] text-[#666666]">Happy Students</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-[30px] font-bold text-[#333333]">200+</div>
                  <div className="text-[14px] text-[#666666]">Cities Covered</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white border border-black rounded w-full h-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES SECTION */}
      <section className="relative ">
        <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] transform skew-y-2 absolute -top-4 -bottom-10 inset-0 "></div>

        <div className="relative mx-auto items-center justify-center flex flex-col text-center py-8">
          <div className="border border-[#FFF5F2] rounded-full w-fit my-4 px-4 py-1 text-[#FFEBE4] font-medium text-[12px] bg-white/20">
            <i className="fa-solid fa-graduation-cap pr-3"></i>
            Backed by Universities
          </div>

          <div className="md:text-6xl text-5xl  font-bold text-white max-w-[750px] text-center my-8 ">
            Trusted Universities
          </div>

          <div className=" max-w-[750px] text-center flex text-white md:text-[20px]">
            Partner schools that support your journey
          </div>

          <div className="flex md:flex-row md:gap-16 mx justify-center my-8 flex-col md:items-center ">
            <img src={citLogo} alt="cit-u" className="h-40 object-contain" />
            <img src={usjrLogo} alt="usjr" className="h-32 object-contain" />
            <img src={ucLogo} alt="uc" className="h-32 object-contain" />
            <img src={uscLogo} alt="usc" className="h-20 object-contain" />
            <img src={delaLogo} alt="dlsu" className="h-24 object-contain" />
          </div>
        </div>
      </section>
      <div className="relative h-5 bg-gradient-to-b from-[#ff792b] to-[#F6F9FC] max-w-screen overflow-hidden"></div>

      {/* FEATURES SECTION */}
      <section
        id="about"
        className="flex flex-col items-center justify-center py-20 bg-[#FFFDFA] relative overflow-hidden"
      >
        <div className="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
          <i className="fa-regular fa-user-plus pr-3"></i>
          Why Choose Us
        </div>

        <div className="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
          Why Students Choose{" "}
          <span className="bg-[#ffeae0] px-2 text-[#F35E27]">Arinda</span>
        </div>

        <div className=" max-w-[750px] md:text-[20px] text-center flex text-[#666666]">
          Everything you need to find safe, affordable housing in a new city.
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center my-12 max-w-[1250px]">
          <div className="flex md:items-center items-start">
            <img src={phoneMockup} alt="cit-u" className="h-96 object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 text-center">
          <div className="flex flex-col items-center w-64 gap-y-3">
            <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
              <i className="fa-solid fa-home text-[20px]"></i>
            </div>

            <div className="text-[20px] font-bold text-[#333333]">
              Quality Listings
            </div>
            <div className="text-[14px] text-[#666666]">
              Browse properties with detailed information,
              high-quality photos, and accurate location data.
            </div>
          </div>

          <div className="flex flex-col items-center w-64 gap-y-3">
            <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
              <i className="fa-solid fa-magnifying-glass-location text-[20px]"></i>
            </div>

            <div className="text-[20px] font-bold text-[#333333]">Smart Search</div>
            <div className="text-[14px] text-[#666666]">
              Advanced filters help you find rentals
              that match your budget and school proximity.
            </div>
          </div>

          <div className="flex flex-col items-center w-64 gap-y-3">
            <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
              <i className="fa-solid fa-book-sparkles text-[20px]"></i>
            </div>

            <div className="text-[20px] font-bold text-[#333333]">
              Secure Booking
            </div>
            <div className="text-[14px] text-[#666666]">
              Message landlords directly, ask questions, and book securely with
              downloadable receipts for your records.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="flex flex-col items-center justify-center py-15 bg-gradient-to-b from-[#FFFDFA] via-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 "></div> */}
        <div className="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
          <i className="fa-regular fa-hexagon-nodes pr-3"></i>
          Arinda in Action
        </div>

        <div
          id="how-it-works"
          className="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8"
        >
          How <span className="bg-[#ffeae0] px-2 text-[#F35E27]">Arinda</span> Works
        </div>

        <div className=" max-w-[750px] md:text-[20px] text-center flex text-[#666666]">
          Everything you need to find safe, affordable housing in a new city
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-20 ">
          <div className="pt-2">
            <Steps />
          </div>
        </div>
      </section>

      {/* PROPERTY OWNERS SECTION */}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
        <div className="border border-[#EAD1C7] rounded-full w-fit px-4 text-[#45352E] font-medium text-[12px]">
          <i className="fa-regular fa-filter-list pr-3"></i>
          List With Us
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
            <div className="flex flex-col gap-y-10">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                For Property Owners
              </h1>

              <p className="text-lg md:text-[20px] text-[#666666] max-w-3xl mx-auto">
                Join thousands of landlords who trust Arinda to connect with
                quality student tenants.
              </p>

              <div>
                <ul className=" text-[#666666] space-y-4 text-[18px]">
                  <li>
                    <i className="fa-solid fa-circle-check pr-3 text-[#F35E27]"></i>{" "}
                    Reach a large audience of student renters
                  </li>
                  <hr className="border-t border-gray-400 opacity-50" />
                  <li>
                    <i className="fa-solid fa-circle-check pr-3 text-[#F35E27]"></i>
                    Easy property management tools
                  </li>
                  <hr className="border-t border-gray-400 opacity-50" />
                  <li>
                    <i className="fa-solid fa-circle-check pr-3 text-[#F35E27]"></i>
                    Secure payment processing
                  </li>
                  <hr className="border-t border-gray-400 opacity-50" />
                  <li>
                    <i className="fa-solid fa-circle-check pr-3 text-[#F35E27]"></i>
                    Dedicated support team
                  </li>
                </ul>
              </div>
              <a href="/register">
                <button className="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-[#F35E27] to-[#ff792b] px-12 text-white p-4 rounded-[6px] text-[18px] font-semibold hover:bg-[#892728] transition shadow-lg">
                  <i className="fa-solid fa-square-list"></i>
                  <span>List Your Property</span>
                </button>
              </a>
            </div>

            <div className="hidden md:block">
              <div className="bg-white border border-black rounded w-full h-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SELECTION */}
      <section id="download-app" className="relative ">
        <div className="bg-gradient-to-b from-[#F35E27] to-[#ff792b] transform -skew-y-2 absolute -top-4 -bottom-10 inset-0 "></div>

        <div className="relative mx-auto items-center justify-center flex flex-col text-center py-8">
          <div className="border border-[#FFF5F2] rounded-full w-fit my-4 px-4 py-1 text-[#FFEBE4] font-medium text-[12px] bg-white/20">
            <i className="fa-solid fa-road pr-3"></i>
            Begin Here
          </div>

          <div className="md:text-6xl text-5xl  font-bold text-white text-center my-8 ">
            Ready to Find your Perfect Home?
          </div>

          <div className=" text-center flex text-white md:text-[20px]">
            Join thousands of students who have found safe, affordable housing
            through Arinda
          </div>

          <div className="flex flex-col md:flex-row font-semibold gap-8 items-center my-12">
            <button className="bg-[white] rounded-[6px] px-6 py-3 text-[#F35E27] cursor-pointer shadow-xl">
              <i className="fa-solid fa-magnifying-glass-location pr-3"></i>
              Start Searching Now
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
  )
}

export default TenantLandingContent