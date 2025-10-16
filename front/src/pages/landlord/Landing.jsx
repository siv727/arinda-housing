import overviewMockUp from "../../assets/illustrations/phone-mockup-1.png";
import messageMockUp from "../../assets/illustrations/phone-mockup-2.png";
import rentalMockUp from "../../assets/illustrations/phone-mockup-3.png";
import Footer from "../../components/common/Footer";
import Steps from "../../components/landlord/Steps";
import Navbar from "../../components/common/Navbar";

export default function LandlordLanding() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar userType="landlord" />
      <div class="flex flex-col">
        {/* TENANT HERO SECTION */}
        <section id = "home" class="relative min-h-[100vh] flex items-center justify-center pt-25 px-4 overflow-hidden bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
            <div class="text-center m-5 mx-auto absolute -top-24 inset-x-0 border-[1.5px] border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px] bg-white/10">
              <i class="fa-regular fa-comments-dollar pr-3"></i>
              Rent. Earn. Simplified
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
              <div class="flex flex-col gap-y-10">
                <h1 class="text-5xl md:text-6xl font-bold text-gray-900">
                  List Your<br></br> Property & Earn More <br></br>
                </h1>

                <p class="text-lg md:text-[20px] text-[#666666] max-w-3xl mx-auto">
                  Connect with verified students seeking quality housing. Our
                  platform streamlines property management while maximizing your
                  rental income through our trusted network.
                </p>

                <a href="/landlord/register">
                  <button class="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-[#F35E27] to-[#ff792b] w-full text-white p-4 rounded-[6px] text-[18px] font-semibold hover:bg-[#892728] transition shadow-lg">
                    <i class="fa-solid fa-flag-checkered"></i>
                    <span>List Your Property Now</span>
                  </button>
                </a>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div class="flex flex-col items-center">
                    <div class="text-[30px] font-bold text-[#333333]">
                      10,000+
                    </div>
                    <div class="text-[14px] text-[#666666]">
                      Verified Properties
                    </div>
                  </div>

                  <div class="flex flex-col items-center">
                    <div class="text-[30px] font-bold text-[#333333]">
                      50,000+
                    </div>
                    <div class="text-[14px] text-[#666666]">Happy Students</div>
                  </div>

                  <div class="flex flex-col items-center">
                    <div class="text-[30px] font-bold text-[#333333]">200+</div>
                    <div class="text-[14px] text-[#666666]">Cities Covered</div>
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
        <section id = "about" class="flex flex-col items-center justify-center py-15 bg-[#FFFDFA] relative overflow-hidden">
          <div class="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
            <i class="fa-regular fa-face-thinking pr-3"></i>
            Why Choose Arinda
          </div>

          <div class="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
            Everything You Need to{" "}
            <span class="bg-[#ffeae0] px-2 text-[#F35E27]">Succeed</span>
          </div>

          <div class=" md:text-[20px] text-center flex text-[#666666] ">
            Comprehensive tools and support to maximize your rental income and
            minimize vacancy periods
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 text-center my-10">
            <div class="flex flex-col items-center w-64 gap-y-3">
              <div class="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
                <i class="fa-solid fa-badge-check text-[20px]"></i>
              </div>

              <div class="text-[20px] font-bold text-[#333333]">
                Verified Tenants
              </div>
              <div class="text-[14px] text-[#666666]">
                Every property is thoroughly verified with detailed information,
                high-quality photos, and accurate location data.
              </div>
            </div>

            <div class="flex flex-col items-center w-64 gap-y-3">
              <div class="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
                <i class="fa-solid fa-magnifying-glass-location text-[20px]"></i>
              </div>

              <div class="text-[20px] font-bold text-[#333333]">
                Smart Analytics
              </div>
              <div class="text-[14px] text-[#666666]">
                Advanced filters and map-based navigation help you find rentals
                that match your budget and school proximity.
              </div>
            </div>

            <div class="flex flex-col items-center w-64 gap-y-3">
              <div class="bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
                <i class="fa-solid fa-book-sparkles text-[20px]"></i>
              </div>

              <div class="text-[20px] font-bold text-[#333333]">
                Community Insights
              </div>
              <div class="text-[14px] text-[#666666]">
                Access student reviews, neighborhood info, and popular amenities
                to make informed decisions and improve tenant satisfaction.
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id = "how-it-works" class="flex flex-col items-center justify-center py-15 bg-gradient-to-b from-[#FFFDFA] via-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
          {/* <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 "></div> */}
          <div class="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
            <i class="fa-regular fa-arrow-progress pr-3"></i>
            Simple Process
          </div>

          <div class="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
            How <span class="bg-[#ffeae0] px-2 text-[#F35E27]">Arinda</span>{" "}
            Works
          </div>

          <div class=" max-w-[750px] md:text-[20px] text-center flex text-[#666666]">
            Everything you need to list, manage, and rent out your properties
            efficiently and securely.
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-20 ">
            <div class="pt-2">
              <Steps />
            </div>
          </div>
        </section>

        {/* PROPERTY OWNERS SECTION */}
        <section class="flex flex-col items-center justify-center py-20 bg-gradient-to-t from-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
          <div class="border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
            <i class="fa-regular fa-mobile pr-3"></i>
            Your Rentals, Simplified
          </div>

          <div class="md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
            All the tools you need to manage<br></br> your properties,{" "}
            <span class="bg-[#ffeae0] px-2 text-[#F35E27]">all</span> in one app
          </div>

          <div class=" max-w-[750px] md:text-[20px] text-center flex text-[#666666] mb-10">
            Easily list, manage, and track your rental properties while
            maximizing income and minimizing vacancy—all in one place.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-16 text-center">
            <div class="flex flex-col items-center w-72">
              <div class="flex items-end bg-[#ffeae0] rounded-[8px] h-90 px-6">
                <img src={overviewMockUp} alt="cit-u" class="object-contain" />
              </div>

              <div class="text-[20px] font-bold text-[#333333] mt-5">
                Landlord Panel
              </div>
              <div class="text-[14px] text-[#666666]">
                Easily manage all your properties in one place
              </div>
            </div>

            <div class="flex flex-col items-center w-76 ">
              <div class="flex items-end bg-[#ffeae0] rounded-[8px] h-90 px-6">
                <img src={rentalMockUp} alt="cit-u" class="object-contain" />
              </div>

              <div class="text-[20px] font-bold text-[#333333] mt-5">
                Current Rentals
              </div>
              <div class="text-[14px] text-[#666666]">
                Track occupancy, rental income, and lease details
              </div>
            </div>

            <div class="flex flex-col items-center w-72 ">
              <div class="flex items-end bg-[#ffeae0] rounded-[8px] h-90 px-6">
                <img src={messageMockUp} alt="cit-u" class="object-contain" />
              </div>

              <div class="text-[20px] font-bold text-[#333333] mt-5">
                Messages
              </div>
              <div class="text-[14px] text-[#666666]">
                Communicate quickly with tenants and support
              </div>
            </div>
          </div>
        </section>

        {/* FINAL SELECTION */}
        <section class="relative" id = "download-app">
          <div class="bg-gradient-to-b from-[#F35E27] to-[#ff792b] transform -skew-y-2 absolute -top-4 -bottom-10 inset-0 "></div>

          <div class="relative mx-auto items-center justify-center flex flex-col text-center py-8">
            <div class="border border-[#FFF5F2] rounded-full w-fit my-4 px-4 py-1 text-[#FFEBE4] font-medium text-[12px] bg-white/20">
              <i class="fa-regular fa-globe pr-3"></i>
              Join Our Network
            </div>

            <div class="md:text-6xl text-5xl  font-bold text-white text-center my-8 ">
              Ready to Maximize Your Rental Income?
            </div>

            <div class=" text-center flex text-white md:text-[20px]">
              Join thousands of students who have found safe, affordable housing
              through Arinda
            </div>

            <div class="flex flex-col md:flex-row font-semibold gap-8 items-center my-12">
              <button class="bg-[white] rounded-[6px] px-6 py-3 text-[#F35E27] cursor-pointer shadow-xl">
                <i class="fa-solid fa-magnifying-glass-location pr-3"></i>
                Start Listing Now
              </button>

              <button class="bg-transparent outline-2 outline-[white] rounded-[6px] px-6 py-3 text-white cursor-pointer">
                <i class="fa-solid fa-file-arrow-down pr-3"></i>
                Download App
              </button>
            </div>
          </div>
        </section>
        <div class="relative h-5 bg-gradient-to-b from-[#ff792b] to-[#F6F9FC] max-w-screen overflow-hidden"></div>
        <Footer />
      </div>
    </>
  );
}
