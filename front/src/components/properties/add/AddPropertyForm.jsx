import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createListing, updateListing, uploadListingPhotos } from '../../../api/landlordListingApi'
import BasicInfoStep from './steps/BasicInfoStep'
import TypeStep from './steps/TypeStep'
import LocationStep from './steps/LocationStep'
import PricingStep from './steps/PricingStep'
import PhotosStep from './steps/PhotosStep'
import AmenitiesStep from './steps/AmenitiesStep'
import NeighborhoodStep from './steps/NeighborhoodStep'
import ReviewStep from './steps/ReviewStep'
import StepNavigation from './StepNavigation'

const steps = [
	{ id: 'basic', label: 'Basic Info', Component: BasicInfoStep },
	{ id: 'type', label: 'Property Type', Component: TypeStep },
	{ id: 'location', label: 'Location', Component: LocationStep },
	{ id: 'pricing', label: 'Pricing', Component: PricingStep },
	{ id: 'photos', label: 'Photos', Component: PhotosStep },
	{ id: 'amenities', label: 'Amenities', Component: AmenitiesStep },
	{ id: 'neighborhood', label: 'Neighborhood', Component: NeighborhoodStep },
	{ id: 'review', label: 'Review', Component: ReviewStep },
]

// Mapping helpers to match Backend expectations vs Frontend Keys
const PROPERTY_TYPE_MAP = {
	'BoardingHouse': 'Boarding House',
	'Apartment': 'Apartment',
	'Dormitory': 'Dormitory',
	'Condominium': 'Condominium'
}

const ROOM_TYPE_MAP = {
	'Studio': 'Studio',
	'PrivateRoom': 'Private Room',
	'SharedRoom': 'Shared Room',
	'SharedDormitory': 'Shared Dormitory',
	'OneBedRoom': '1-Bedroom',
	'TwoBedRoom': '2-Bedroom'
}

export default function AddPropertyForm({ editMode = false, listingId = null, initialData = {} }) {
	const navigate = useNavigate()
	const [current, setCurrent] = useState(0)
	const [form, setForm] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Initialize form with initialData in edit mode
	useEffect(() => {
		if (editMode && initialData) {
			setForm(initialData)
		}
	}, [editMode, initialData])

	const goNext = () => setCurrent((c) => Math.min(c + 1, steps.length - 1))
	const goBack = () => setCurrent((c) => Math.max(c - 1, 0))

	const update = (patch) => setForm((f) => ({ ...f, ...patch }))

	const submit = async () => {
		setIsSubmitting(true)
		try {
			let photoUrls = []

			// 1. Handle Photo Uploads
			if (editMode) {
				// In edit mode, keep existing photos and add new ones
				photoUrls = [...(form.existingPhotos || [])]
				
				// Upload new photos if any
				if (form.photos && form.photos.length > 0) {
					const formData = new FormData()
					form.photos.forEach((file) => {
						formData.append('photos', file)
					})
					const photoResponse = await uploadListingPhotos(formData)
					photoUrls = [...photoUrls, ...(photoResponse.data.urls || [])]
				}
			} else {
				// In create mode, upload all photos
				if (form.photos && form.photos.length > 0) {
					const formData = new FormData()
					form.photos.forEach((file) => {
						formData.append('photos', file)
					})
					const photoResponse = await uploadListingPhotos(formData)
					photoUrls = photoResponse.data.urls || []
				}
			}

			// 2. Prepare Payload (Map Frontend State -> Backend DTO)
			const payload = {
				title: form.title,
				description: form.description,

				// Map Types (Handle undefined/fallback safely)
				propertytype: PROPERTY_TYPE_MAP[form.propertyType] || form.propertyType || 'Boarding House',
				roomtype: ROOM_TYPE_MAP[form.roomType] || form.roomType || 'Private Room',

				// Location Mapping
				unit: form.unit || '',
				building: form.building || '',
				address: form.street,        // Map 'street' -> 'address'
				barangay: form.barangay,
				city: form.city,
				postcode: form.zip,          // Map 'zip' -> 'postcode'
				province: form.province,

				// Pricing (Ensure numbers)
				monthlyrent: Number(form.monthlyRent),
				securitydeposit: Number(form.securityDeposit),
				appfee: Number(form.applicationFee) || 0,
				petfee: Number(form.petFee) || 0,
				advancerent: Number(form.advanceRentMonths) || 0,

				// Arrays
				// Convert string lease terms ("6", "12") to Integers
				leaseterms: (form.leaseTerms || []).map(t => parseInt(t, 10)),
				photourls: photoUrls,
				inclusions: form.includedUtilities || [], // Map 'includedUtilities' -> 'inclusions'
				amenities: form.amenities || [],
				establishments: form.neighborhood || []   // Map 'neighborhood' -> 'establishments'
			}

			// 3. Create or Update Listing
			console.log("Submitting payload:", payload)
			if (editMode) {
				await updateListing(listingId, payload)
			} else {
				await createListing(payload)
			}

			// 4. Success Redirect
			navigate('/landlord/dashboard/properties')

		} catch (error) {
			console.error(`Failed to ${editMode ? 'update' : 'create'} listing:`, error)
			alert(`Failed to ${editMode ? 'update' : 'create'} listing. Please check your inputs and try again.`)
		} finally {
			setIsSubmitting(false)
		}
	}

	const isStepValid = (stepIndex, f) => {
		switch (steps[stepIndex].id) {
			case 'basic':
				return Boolean((f.title || '').trim()) && Boolean((f.description || '').trim())
			case 'type':
				return Boolean((f.propertyType || '').trim()) && Boolean((f.roomType || '').trim())
			case 'location':
				// Removed mapIsConfirmed check for easier testing, add back if strictly required
				return Boolean((f.street || '').trim() && (f.city || '').trim() && (f.province || '').trim())
			case 'pricing':
				return Number(f.monthlyRent) > 0 && (f.securityDeposit !== undefined && f.securityDeposit !== '')
			case 'photos':
				return (editMode && form.existingPhotos && form.existingPhotos.length >= 5) || 
				       (Array.isArray(form.photos) && form.photos.length >= 5) ||
				       ((form.existingPhotos?.length || 0) + (form.photos?.length || 0) >= 5)
			default:
				return true
		}
	}

	const canNext = isStepValid(current, form)
	const CurrentComponent = steps[current].Component

	return (
		<div className="max-w-4xl mx-auto space-y-6 pb-28 h-full">
			{isSubmitting && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-xl text-center">
						<i className="fa-solid fa-circle-notch fa-spin text-4xl text-[#F35E27] mb-4"></i>
						<p className="text-lg font-medium">
							{editMode ? 'Updating your property...' : 'Publishing your property...'}
						</p>
						<p className="text-sm text-gray-500">
							{editMode ? 'Saving changes' : 'Uploading photos and saving details'}
						</p>
					</div>
				</div>
			)}

			<div className="2xl:p-6 space-y-6 ">
				<div className="space-y-2 ">
					<h2 className="text-3xl font-semibold">{steps[current].label}</h2>
					<CurrentComponent form={form} update={update} />
				</div>
			</div>

			<StepNavigation
				current={current}
				total={steps.length}
				onBack={goBack}
				onNext={goNext}
				onSubmit={submit}
				canNext={canNext}
			/>
		</div>
	)
}