import { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import Navbar from '../../../components/landlord/Navbar'
import { getLandlordProfile, updateLandlordProfile } from '../../../api/landlordProfileApi'

const AccountSettings = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [isFormDirty, setIsFormDirty] = useState(false)

    const [profileData, setProfileData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: ''
    })

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phonenumber: ''
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            setLoading(true)
            setMessage({ type: '', text: '' })
            const data = await getLandlordProfile()

            setProfileData(data)
            setFormData({
                firstname: data.firstname || '',
                lastname: data.lastname || '',
                phonenumber: data.phonenumber || ''
            })
        } catch (error) {
            console.error('Error fetching profile:', error)
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to load profile data'
            })
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

            const updatedData = await updateLandlordProfile(formData)

            setProfileData(updatedData)
            setFormData({
                firstname: updatedData.firstname || '',
                lastname: updatedData.lastname || '',
                phonenumber: updatedData.phonenumber || ''
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

    const getInitials = () => {
        const first = profileData.firstname?.charAt(0) || ''
        const last = profileData.lastname?.charAt(0) || ''
        return (first + last).toUpperCase()
    }

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
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left bg-[#FFF5F0] text-[#F35E27] border border-[#F35E27]"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-medium">Personal Information</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg border border-[#EAD1C7] p-6">
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

                                                {/* Phone Number */}
                                                <div className="col-span-1">
                                                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phonenumber"
                                                        value={formData.phonenumber}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-2.5 border border-[#EAD1C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F35E27] focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings
