import RecentBookingRequests from '@/components/landlord/dashboard/RecentBookingRequests';
import PropertyStatusOverview from '@/components/landlord/dashboard/PropertyStatusOverview';
import { bookings } from '@/data/mockBookings';
import { properties } from '@/data/mockProperties';

export default function Overview() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-4">
                <h1 className="text-[32px] font-bold">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-gray-500">Total Properties</h2>
                    <p className="text-3xl font-semibold mt-1">8</p>
                    <p className="text-sm text-gray-500">Listed on Arinda</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-gray-500">Occupied Units</h2>
                    <p className="text-3xl font-semibold mt-1">12</p>
                    <p className="text-sm text-gray-500">Confirmed tenants</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-gray-500">Available Units</h2>
                    <p className="text-3xl font-semibold mt-1">3</p>
                    <p className="text-sm text-gray-500">Visible to students</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-gray-500">Pending Requests</h2>
                    <p className="text-3xl font-semibold mt-1">2</p>
                    <p className="text-sm text-gray-500">Needs review</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#EAD1C7] p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/landlord/dashboard/properties/add"
                        className="flex items-center justify-between p-4 rounded-xl border border-[#EAD1C7] hover:border-[#F35E27] hover:bg-[#FFF8F5] transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center group-hover:bg-[#F35E27] transition-colors">
                                <i className="fa-solid fa-plus text-[#F35E27] group-hover:text-white transition-colors"></i>
                            </div>
                            <span className="font-semibold text-gray-800">Add New Listing</span>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-400 group-hover:text-[#F35E27] transition-colors"></i>
                    </a>

                    <a
                        href="/landlord/dashboard/properties"
                        className="flex items-center justify-between p-4 rounded-xl border border-[#EAD1C7] hover:border-[#F35E27] hover:bg-[#FFF8F5] transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center group-hover:bg-[#F35E27] transition-colors">
                                <i className="fa-solid fa-file-lines text-[#F35E27] group-hover:text-white transition-colors"></i>
                            </div>
                            <span className="font-semibold text-gray-800">View Applications</span>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-400 group-hover:text-[#F35E27] transition-colors"></i>
                    </a>

                    <a
                        href="/landlord/dashboard/tenants"
                        className="flex items-center justify-between p-4 rounded-xl border border-[#EAD1C7] hover:border-[#F35E27] hover:bg-[#FFF8F5] transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center group-hover:bg-[#F35E27] transition-colors">
                                <i className="fa-solid fa-users text-[#F35E27] group-hover:text-white transition-colors"></i>
                            </div>
                            <span className="font-semibold text-gray-800">View Tenants</span>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-400 group-hover:text-[#F35E27] transition-colors"></i>
                    </a>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <RecentBookingRequests bookings={bookings} />
                <PropertyStatusOverview properties={properties} />
            </div>
            
        </div>
    );
}
