import { useState, useEffect } from 'react'
import { User, MapPin } from 'lucide-react'
import Navbar from '../../components/tenant/Navbar'
import { getProfile, updateProfile } from '../../api/profileApi'
import { getStudentLeases } from '../../api/leaseApi'

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('personal')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [isFormDirty, setIsFormDirty] = useState(false)

    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        school: '',
        studentid: ''
    })

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        school: '',
        studentid: ''
    })

    // Places Rented state
    const [leases, setLeases] = useState([])
    const [leasesLoading, setLeasesLoading] = useState(false)
    const [leaseFilter, setLeaseFilter] = useState('current')



    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await getProfile()
            const data = response.data

            setProfileData(data)
            setFormData({
                firstname: data.firstname || '',
                lastname: data.lastname || '',
                school: data.school || '',
                studentid: data.studentid || ''
            })
        } catch (error) {
            console.error('Error fetching profile:', error)
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to load profile data'
            setMessage({ type: 'error', text: errorMsg })
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setIsFormDirty(true)
        setMessage({ type: '', text: '' }) // Clear any existing messages
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSaving(true)
            setMessage({ type: '', text: '' })

            const response = await updateProfile(formData)
            const updatedData = response.data

            setProfileData(updatedData)
            setFormData({
                firstname: updatedData.firstname || '',
                lastname: updatedData.lastname || '',
                school: updatedData.school || '',
                studentid: updatedData.studentid || ''
            })

            setIsFormDirty(false) // Reset dirty state after successful save
            setMessage({ type: 'success', text: 'Profile updated successfully!' })

            // Clear success message after 3 seconds
            setTimeout(() => {
                setMessage({ type: '', text: '' })
            }, 3000)
        } catch (error) {
            console.error('Error updating profile:', error)
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile'
            })
        } finally {
            setSaving(false)
        }
    }

    const fetchLeases = async () => {
        try {
            setLeasesLoading(true)
            const response = await getStudentLeases(leaseFilter)
            setLeases(response.data)
        } catch (error) {
            console.error('Error fetching leases:', error)
        } finally {
            setLeasesLoading(false)
        }
    }

    useEffect(() => {
        if (activeTab === 'places') {
            fetchLeases()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, leaseFilter])

    const getInitials = () => {
        const first = profileData.firstname?.charAt(0) || ''
        const last = profileData.lastname?.charAt(0) || ''
        return (first + last).toUpperCase()
    }

    const tabs = [
        { id: 'personal', label: 'Personal Information', icon: User },
        { id: 'places', label: 'Places Rented', icon: MapPin }
    ]

    return (
        <div className="min-h-screen bg-[#FBF8F6]">
            <Navbar />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Account Settings</h1>
                    <p className="text-[#666666]">Manage your personal information and account security</p>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border border-[#EAD1C7] overflow-hidden">
                            <div className="p-4 border-b border-[#EAD1C7]">
                                <h2 className="font-semibold text-[#2C2C2C]">Settings</h2>
                            </div>
                            <nav className="p-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${activeTab === tab.id
                                                ? 'bg-[#FFF5F0] text-[#F35E27] border border-[#F35E27]'
                                                : 'text-[#666666] hover:bg-[#FBF8F6]'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm font-medium">{tab.label}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg border border-[#EAD1C7] p-6">
                            {/* Personal Information Tab */}
                            {activeTab === 'personal' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-[#2C2C2C] mb-1">
                                                Personal Information
                                            </h2>
                                            <p className="text-sm text-[#666666]">
                                                Update your personal details and profile picture
                                            </p>
                                        </div>
                                        <button
                                            type="submit"
                                            form="profile-form"
                                            disabled={!isFormDirty || saving || loading}
                                            className={`px-6 py-2 rounded-md transition-all ${isFormDirty && !saving && !loading
                                                ? 'bg-[#F35E27] text-white hover:bg-[#D94E1F] cursor-pointer'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>

                                    {message.text && (
                                        <div
                                            className={`mb-6 p-4 rounded-md ${message.type === 'success'
                                                ? 'bg-green-50 text-green-800 border border-green-200'
                                                : 'bg-red-50 text-red-800 border border-red-200'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    )}

                                    {loading ? (
                                        <div className="flex items-center justify-center py-12">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F35E27]"></div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Profile Picture Section */}
                                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#EAD1C7]">
                                                <div className="w-24 h-24 rounded-full bg-[#F35E27] flex items-center justify-center">
                                                    <span className="text-white text-3xl font-bold">
                                                        {getInitials()}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-[#666666] mb-2">
                                                        Profile picture upload coming soon
                                                    </p>
                                                    <button
                                                        type="button"
                                                        disabled
                                                        className="px-4 py-2 text-sm border border-[#EAD1C7] rounded-md text-[#999999] cursor-not-allowed"
                                                    >
                                                        Change Photo
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Profile Form */}
                                            <form id="profile-form" onSubmit={handleSubmit}>
                                                <div className="grid grid-cols-2 gap-6">
                                                    {/* First Name */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="firstname"
                                                            value={formData.firstname}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full px-4 py-2.5 border border-[#EAD1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-transparent"
                                                        />
                                                    </div>

                                                    {/* Last Name */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="lastname"
                                                            value={formData.lastname}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full px-4 py-2.5 border border-[#EAD1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-transparent"
                                                        />
                                                    </div>

                                                    {/* University */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                            University
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="school"
                                                            value={formData.school}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-2.5 border border-[#EAD1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-transparent"
                                                        />
                                                    </div>

                                                    {/* Student ID */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                            Student ID
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="studentid"
                                                            value={formData.studentid}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-2.5 border border-[#EAD1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Places Rented Tab */}
                            {activeTab === 'places' && (
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold text-[#2C2C2C] mb-1">
                                            Places Rented
                                        </h2>
                                        <p className="text-sm text-[#666666]">
                                            View and manage your rental history
                                        </p>
                                    </div>

                                    {/* Filter Tabs */}
                                    <div className="flex gap-2 mb-6">
                                        <button
                                            onClick={() => setLeaseFilter('current')}
                                            className={`px-6 py-2 rounded-md font-medium transition-colors ${leaseFilter === 'current'
                                                ? 'bg-[#F35E27] text-white'
                                                : 'bg-white text-[#666666] border border-[#EAD1C7] hover:bg-[#FBF8F6]'
                                                }`}
                                        >
                                            Current
                                        </button>
                                        <button
                                            onClick={() => setLeaseFilter('past')}
                                            className={`px-6 py-2 rounded-md font-medium transition-colors ${leaseFilter === 'past'
                                                ? 'bg-[#F35E27] text-white'
                                                : 'bg-white text-[#666666] border border-[#EAD1C7] hover:bg-[#FBF8F6]'
                                                }`}
                                        >
                                            Past
                                        </button>
                                    </div>

                                    {/* Leases List */}
                                    {leasesLoading ? (
                                        <div className="flex items-center justify-center py-12">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F35E27]"></div>
                                        </div>
                                    ) : leases.length === 0 ? (
                                        <div className="text-center py-12">
                                            <MapPin className="w-16 h-16 mx-auto mb-4 text-[#EAD1C7]" />
                                            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">
                                                No rentals found
                                            </h3>
                                            <p className="text-[#666666]">
                                                {leaseFilter === 'current'
                                                    ? "You don't have any current rentals"
                                                    : "You don't have any past rentals"}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {leases.map((lease) => (
                                                <div
                                                    key={lease.id}
                                                    className="flex items-center gap-4 p-4 border border-[#EAD1C7] rounded-lg hover:shadow-md transition-shadow"
                                                >
                                                    {/* Property Image */}
                                                    <div className="flex-shrink-0 w-32 h-24 bg-[#EAD1C7] rounded-md overflow-hidden">
                                                        {lease.photoUrl ? (
                                                            <img
                                                                src={lease.photoUrl}
                                                                alt={lease.propertyName}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[#999999]">
                                                                <MapPin className="w-8 h-8" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Property Details */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <h3 className="font-semibold text-[#2C2C2C] text-lg mb-1">
                                                                    {lease.propertyName}
                                                                </h3>
                                                                <p className="text-sm text-[#666666] mb-1">
                                                                    {lease.propertyAddress}
                                                                </p>
                                                                <p className="text-sm text-[#666666]">
                                                                    {new Date(lease.startDate).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric'
                                                                    })} - {new Date(lease.endDate).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric'
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <span className="text-lg font-bold text-[#2C2C2C]">
                                                                ₱{lease.monthlyPrice.toLocaleString()}/month
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-sm text-[#666666]">
                                                                <span className="font-medium">Host:</span> {lease.landlordName}
                                                            </div>
                                                            <div className="flex items-center gap-4">

                                                                <a
                                                                    href={`/tenant/listings/${lease.listingId}`}
                                                                    className="text-[#F35E27] font-medium hover:underline"
                                                                >
                                                                    View Details
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings