import React, { useState } from 'react'
import BasicInfoStep from './steps/BasicInfoStep'
import TypeStep from './steps/TypeStep'
import LocationStep from './steps/LocationStep'
import PricingStep from './steps/PricingStep'
import PhotosStep from './steps/PhotosStep'
import AmenitiesStep from './steps/AmenitiesStep'
import NeighborhoodStep from './steps/NeighborhoodStep'
import ReviewStep from './steps/ReviewStep'
import StepNavigation from './StepNavigation'
import ProgressBar from './ProgressBar'

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

export default function AddPropertyForm() {
	const [current, setCurrent] = useState(0)
	const [form, setForm] = useState({})

	const goNext = () => setCurrent((c) => Math.min(c + 1, steps.length - 1))
	const goBack = () => setCurrent((c) => Math.max(c - 1, 0))

	const update = (patch) => setForm((f) => ({ ...f, ...patch }))

	const submit = () => {
		console.log('Submitting property:', form)
		alert('Property submitted (placeholder)')
	}

	const isStepValid = (stepIndex, f) => {
		switch (steps[stepIndex].id) {
			case 'basic':
				return Boolean((f.title || '').trim()) && Boolean((f.description || '').trim())
			case 'type':
				return Boolean(f.type)
			case 'location':
				return Boolean((f.street || '').trim() && (f.city || '').trim() && (f.province || '').trim() && f.mapIsConfirmed)
			case 'pricing':
				return Number(f.monthlyRent) > 0 && (f.securityDeposit !== undefined && f.securityDeposit !== '')
			case 'photos':
				return Array.isArray(f.photos) && f.photos.length >= 5
			case 'amenities':
			case 'neighborhood':
				return true
			case 'review':
				return true
			default:
				return true
		}
	}

	const canNext = isStepValid(current, form)

	const CurrentComponent = steps[current].Component

	return (
		<div className="max-w-4xl mx-auto space-y-6 pb-28 h-full">
			
			<div className="2xl:p-6 space-y-6 ">
				<div className="space-y-2 ">
					<h2 className="text-3xl font-semibold">{steps[current].label}</h2>
					<CurrentComponent form={form} update={update} />
				</div>
			</div>

			<StepNavigation current={current} total={steps.length} onBack={goBack} onNext={goNext} onSubmit={submit} canNext={canNext} />
		</div>
	)
}
