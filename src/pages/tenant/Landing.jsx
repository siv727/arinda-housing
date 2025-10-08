import citLogo from '../../assets/universities/cit-logo.png'
import delaLogo from '../../assets/universities/delasalle-logo.png'
import ucLogo from '../../assets/universities/uc-logo.png'
import uscLogo from '../../assets/universities/usc-logo.png'
import usjrLogo from '../../assets/universities/usjr-logo.png'
import phoneMockup from '../../assets/illustrations/phone-mockup.png'

export default function TenantLanding() {
  return (
    <div class = "flex flex-col">

        {/* TENANT HERO SECTION */}
        <section class="relative min-h-[100vh] flex items-center justify-center px-4 overflow-hidden bg-gradient-to-bl from-[#FFF1EB] to-[#FFFDFA]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
                <div class="text-center m-5 mx-auto absolute -top-24 inset-x-0 border-[1.5px] border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px] bg-white/10">
                    <i class="fa-regular fa-badge-check mr-2"></i>
                    Verified Listings, Student Approved
                </div>
                <div class = "grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
                    <div class="flex flex-col gap-y-10">
                        <h1 class="text-5xl md:text-6xl font-bold text-gray-900">
                            Find Your<br></br> Perfect Student Housing <br></br>
                        </h1>

                        <p class="text-lg md:text-[20px] text-[#666666] max-w-3xl mx-auto">
                           Skip the door-to-door search. Discover verified, safe, and affordable rentals designed specifically for students moving to new cities.
                        </p>

                        <a href="{% url 'register' %}">
                            <button class="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-[#F35E27] to-[#ff792b] w-full text-white p-4 rounded-[6px] text-[18px] font-semibold hover:bg-[#892728] transition shadow-lg">
                                <i class="fa-solid fa-flag-checkered"></i>
                                <span>Start Your Search</span>
                            </button>
                        </a>
                        

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div class="flex flex-col items-center">
                                <div class="text-[30px] font-bold text-[#333333]">10,000+</div>
                                <div class="text-[14px] text-[#666666]">Verified Properties</div>
                            </div>

                            <div class="flex flex-col items-center">
                                <div class="text-[30px] font-bold text-[#333333]">50,000+</div>
                                <div class="text-[14px] text-[#666666]">Happy Students</div>
                            </div>

                            <div class="flex flex-col items-center">
                                <div class="text-[30px] font-bold text-[#333333]">200+</div>
                                <div class="text-[14px] text-[#666666]">Cities Covered</div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="bg-white border border-black rounded w-full h-110">
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* UNIVERSITIES SECTION */}
        <section class = "relative ">
                <div class="bg-gradient-to-b from-[#F35E27] to-[#ff792b] transform skew-y-2 absolute -top-4 -bottom-10 inset-0 "></div>

                <div class = "relative mx-auto items-center justify-center flex flex-col text-center py-8">
                    <div class = "border border-[#FFF5F2] rounded-full w-fit my-4 px-4 py-1 text-[#FFEBE4] font-medium text-[12px] bg-white/20">
                        <i class="fa-solid fa-graduation-cap pr-3"></i>
                            Backed by Universities
                    </div>

                    <div class = "md:text-6xl text-5xl  font-bold text-white max-w-[750px] text-center my-8 ">
                        Trusted Universities
                    </div>

                    <div class =" max-w-[750px] text-center flex text-white md:text-[20px]">Partner schools that support your journey</div>

                    <div class = "flex md:flex-row md:gap-16 mx justify-center my-8 flex-col md:items-center ">
                        <img src={citLogo} alt="cit-u" class="h-40 object-contain" />
                        <img src={usjrLogo} alt="usjr" class="h-32 object-contain" />
                        <img src={ucLogo} alt="uc" class="h-32 object-contain" />
                        <img src={uscLogo} alt="usc" class="h-20 object-contain" />
                        <img src={delaLogo} alt="dlsu" class="h-24 object-contain" />
                    </div>

                </div>
        </section>
        <div class = "relative h-5 bg-gradient-to-b from-[#ff792b] to-[#F6F9FC] max-w-screen overflow-hidden"></div>

        {/* FEATURES SECTION */}
        <section class = "flex flex-col items-center justify-center py-20 bg-[#FFFDFA] relative overflow-hidden">
                <div class = "border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
                    <i class="fa-regular fa-user-plus pr-3"></i>
                    Why Choose Us
                </div>

                <div class = "md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
                    Why Students Choose Arinda
                </div>

                <div class =" max-w-[750px] md:text-[20px] text-center flex text-[#666666]">Everything you need to find safe, affordable housing in a new city.</div>


                <flex class = "flex flex-col md:flex-row gap-8 justify-center my-12 max-w-[1250px]">
                   <div class = "flex md:items-center items-start">
                        <img src={phoneMockup} alt="cit-u" class="h-96 object-contain" />
                    </div>
                </flex>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 text-center">
                            <div class="flex flex-col items-center w-64 gap-y-3">
                                <div class = "bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
                                    <i class="fa-solid fa-badge-check text-[20px]"></i>
                                </div>
                                
                                <div class="text-[20px] font-bold text-[#333333]">Verified Listings</div>
                                <div class="text-[14px] text-[#666666]">Every property is thoroughly verified with detailed information, high-quality photos, and accurate location data.</div>
                            </div>

                            <div class="flex flex-col items-center w-64 gap-y-3">
                                <div class = "bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
                                    <i class="fa-solid fa-magnifying-glass-location text-[20px]"></i>
                                </div>

                                <div class="text-[20px] font-bold text-[#333333]">Smart Search</div>
                                <div class="text-[14px] text-[#666666]">Advanced filters and map-based navigation help you find rentals that match your budget and school proximity.</div>
                            </div>

                            <div class="flex flex-col items-center w-64 gap-y-3">
                                <div class = "bg-gradient-to-b from-[#F35E27] to-[#ff792b] text-white w-12 h-12 flex items-center justify-center rounded">
                                    <i class="fa-solid fa-book-sparkles text-[20px]"></i>
                                </div>

                                <div class="text-[20px] font-bold text-[#333333]">Secure Booking</div>
                                <div class="text-[14px] text-[#666666]">Message landlords directly, ask questions, and book securely with downloadable receipts for your records.</div>
                            </div>
                        </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section class = "flex flex-col items-center justify-center py-20 bg-gradient-to-b from-[#FFFDFA] via-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 "></div>    
                <div class = "border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
                    <i class="fa-regular fa-hexagon-nodes pr-3"></i>
                    Arinda in Action
                </div>

                <div class = "md:text-6xl text-5xl text-[30px] font-bold text-[var(--text-title)] text-center leading-20 my-8">
                    How Arinda Works
                </div>

                <div class =" max-w-[750px] md:text-[20px] text-center flex text-[#666666]">
                    Everything you need to find safe, affordable housing in a new city
                </div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
                 <div class = "grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
                    <div className="hidden md:block">
                        <div className="bg-white border border-black rounded w-full h-110">
                           
                        </div>
                    </div>
                <div class="pt-2">

                <div class="flex relative">
                    <ol class="relative border-s-2 border-dashed border-[#F35E27] text-gray-700">

                    <li class="mb-10 ms-6 relative">
                        <span class="absolute flex items-center justify-center w-10 h-10 bg-[#F35E27] text-white font-bold rounded-full -start-5 ring-4 ring-white">
                        1
                        </span>
                        <h3 class="text-lg font-semibold text-gray-900">Search & Filter</h3>
                        <p class="text-gray-600 mt-1">
                        Use our advanced search tools to find properties that match your budget, preferences, and school location.
                        </p>
                    </li>


                    <li class="mb-10 ms-6 relative">
                        <span class="absolute flex items-center justify-center w-10 h-10 bg-[#F35E27] text-white font-bold rounded-full -start-5 ring-4 ring-white">
                        2
                        </span>
                        <h3 class="text-lg font-semibold text-gray-900">Connect & Review</h3>
                        <p class="text-gray-600 mt-1">
                        Read student reviews, view detailed photos, and message landlords directly to get all your questions answered.
                        </p>
                    </li>

                    <li class="ms-6 relative">
                        <span class="absolute flex items-center justify-center w-10 h-10 bg-[#F35E27] text-white font-bold rounded-full -start-5 ring-4 ring-white">
                        3
                        </span>
                        <h3 class="text-lg font-semibold text-gray-900">Book Securely</h3>
                        <p class="text-gray-600 mt-1">
                        Complete your booking with confidence through our secure platform and receive all necessary documentation.
                        </p>
                    </li>
                    </ol>
                </div>
                </div>

            </div>

                    
                </div>
        </section>

        {/* PROPERTY OWNERS SECTION */}
        <section class = "flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-[#FFF1EB] to-[#FFFDFA] relative overflow-hidden">
                <div class = "border border-[#EAD1C7] rounded-full w-fit px-4 py-1 text-[#45352E] font-medium text-[12px]">
                    <i class="fa-regular fa-filter-list pr-3"></i>
                    List With Us
                </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 relative z-20 ">
                <div class = "grid grid-cols-1 md:grid-cols-2 gap-32 items-start">
                    <div class="flex flex-col gap-y-10">
                        <h1 class="text-5xl md:text-6xl font-bold text-gray-900">
                            For Property Owners
                        </h1>

                        <p class="text-lg md:text-[20px] text-[#666666] max-w-3xl mx-auto">
                           Join thousands of landlords who trust Arinda to connect with quality student tenants.
                        </p>
                        
                        <div>
                            <ul class=" text-[#666666] space-y-4 text-[18px]">
                                <li><i class="fa-solid fa-badge-check pr-3 text-[#F35E27]"></i> Reach a large audience of verified student renters</li>
                                 <hr class="border-t border-gray-400 opacity-50" />
                                <li><i class="fa-solid fa-badge-check pr-3 text-[#F35E27]"></i>Easy property management tools</li>
                                <hr class="border-t border-gray-400 opacity-50" />
                                <li><i class="fa-solid fa-badge-check pr-3 text-[#F35E27]"></i>Secure payment processing</li>
                                <hr class="border-t border-gray-400 opacity-50" />
                                <li><i class="fa-solid fa-badge-check pr-3 text-[#F35E27]"></i>Dedicated support team</li>
                            </ul>
                        </div>
                        <a href="/landlord">
                            <button class="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-[#F35E27] to-[#ff792b] px-12 text-white p-4 rounded-[6px] text-[18px] font-semibold hover:bg-[#892728] transition shadow-lg">
                                <i class="fa-solid fa-square-list"></i>
                                <span>List Your Property</span>
                            </button>
                        </a>
                        
                    </div>

                    <div className="hidden md:block">
                        <div className="bg-white border border-black rounded w-full h-110">
                           
                        </div>
                    </div>
                </div>
                </div>
        </section>

        {/* FINAL SELECTION */}
        <section class = "relative ">
                <div class="bg-gradient-to-b from-[#F35E27] to-[#ff792b] transform -skew-y-2 absolute -top-4 -bottom-10 inset-0 "></div>

                <div class = "relative mx-auto items-center justify-center flex flex-col text-center py-8">
                    <div class = "border border-[#FFF5F2] rounded-full w-fit my-4 px-4 py-1 text-[#FFEBE4] font-medium text-[12px] bg-white/20">
                        <i class="fa-solid fa-graduation-cap pr-3"></i>
                            Begin Here
                    </div>

                    <div class = "md:text-6xl text-5xl  font-bold text-white text-center my-8 ">
                        Ready to Find your Perfect Home?
                    </div>

                    <div class =" text-center flex text-white md:text-[20px]">Join thousands of students who have found safe, affordable housing through Arinda</div>

                    <div class = "flex flex-col md:flex-row font-semibold gap-8 items-center my-8">
                  
                            <button class ="bg-[white] rounded-[6px] px-6 py-3 text-[#F35E27] cursor-pointer shadow-xl">
                                <i class="fa-solid fa-magnifying-glass-location pr-3"></i>
                                Start Searching Now
                            </button>
         
                            <button class ="bg-transparent outline-2 outline-[white] rounded-[6px] px-6 py-3 text-white cursor-pointer">
                                <i class="fa-solid fa-file-arrow-down pr-3"></i>
                                Download App
                            </button>
      
                    </div>


                </div>
        </section>
        <div class = "relative h-5 bg-gradient-to-b from-[#ff792b] to-[#F6F9FC] max-w-screen overflow-hidden"></div>
        
    </div>
  )
}
