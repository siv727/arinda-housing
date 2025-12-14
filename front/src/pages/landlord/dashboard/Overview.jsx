import { useEffect, useState } from 'react';
import RecentBookingRequests from '@/components/landlord/dashboard/RecentBookingRequests';
import PropertyStatusOverview from '@/components/landlord/dashboard/PropertyStatusOverview';
import { getDashboardStats, getRecentApplications, getRecentListings } from '../../../api/dashboardApi';

export default function Overview() {
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalTenants: 0,
        totalApplications: 0,
        pendingApplications: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [recentProperties, setRecentProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Run all requests in parallel for speed
                const [statsRes, bookingsRes, listingsRes] = await Promise.all([
                    getDashboardStats(),
                    getRecentApplications(),
                    getRecentListings()
                ]);

                setStats(statsRes.data);

                // Map API response to Component format (if needed)
                // Assuming backend DTO matches mostly, but let's be safe
                setRecentBookings(bookingsRes.data.map(b => ({
                    id: b.id,
                    status: b.status, // "PENDING", "APPROVED"
                    bookedDate: new Date(b.dateBooked).toLocaleDateString(),
                    moveInDate: new Date(b.moveInDate).toLocaleDateString(),
                    tenant: {
                        name: b.applicantName,
                        avatar: b.applicantPhotoUrl
                    },
                    property: {
                        title: b.listingTitle
                    }
                })));

                setRecentProperties(listingsRes.data.map(p => ({
                    id: p.id,
                    title: p.title,
                    location: p.location,
                    image: p.mainPhotoUrl,
                    type: p.propertyType,
                    price: p.monthlyRent,
                    status: "Available" // Default, or add status to RecentListingDTO in backend
                })));

            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-10 text-center text-gray-500">Loading dashboard...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="space-y-4">
                <h1 className="text-[32px] font-bold">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-[#F35E27] font-medium">Total Properties</h2>
                    <p className="text-3xl font-semibold mt-1">{stats.totalProperties}</p>
                    <p className="text-sm text-gray-500">Listed on Arinda</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-[#F35E27] font-medium">Total Tenants</h2>
                    <p className="text-3xl font-semibold mt-1">{stats.totalTenants}</p>
                    <p className="text-sm text-gray-500">Active tenants</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-[#F35E27] font-medium">Total Applications</h2>
                    <p className="text-3xl font-semibold mt-1">{stats.totalApplications}</p>
                    <p className="text-sm text-gray-500">All time</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#EAD1C7] p-5 space-y-2">
                    <h2 className="text-sm text-[#F35E27] font-medium">Pending Requests</h2>
                    <p className="text-3xl font-semibold mt-1">{stats.pendingApplications}</p>
                    <p className="text-sm text-gray-500">Needs review</p>
                </div>
            </div>

            {/* Quick Actions (Keep as is) */}
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
                        href="/landlord/dashboard/bookings"
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
                <RecentBookingRequests bookings={recentBookings} />
                <PropertyStatusOverview properties={recentProperties} />
            </div>

        </div>
    );
}