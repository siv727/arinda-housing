// Mock application data
export const mockApplications = [
  {
    id: 1,
    propertyTitle: "Modern Studio Near Campus",
    propertyLocation: "University District",
    propertyPrice: "₱8,000/month",
    landlordName: "Sarah Descaya",
    checkInDate: "August 15, 2024",
    moveInDate: "August 15, 2024",
    appliedDate: "March 15, 2024",
    status: "Approved",
    applicantMessage: "Hello, I'm a third-year student looking for a quiet place to study. I'm responsible and will take good care of the property.",
    responseMessage: "Congratulations! Your application has been approved. Please review the lease agreement and complete the move-in process.",
    documents: [
      { name: "Lease Agreement.pdf", size: "2.4 MB", url: "#" },
      { name: "Move-in Checklist.pdf", size: "1.1 MB", url: "#" }
    ]
  },
  {
    id: 2,
    propertyTitle: "Cozy 1BR Apartment",
    propertyLocation: "Downtown Campus Area",
    propertyPrice: "₱11,000/month",
    landlordName: "Michael Chen",
    checkInDate: "August 20, 2024",
    moveInDate: "August 20, 2024",
    appliedDate: "March 12, 2024",
    status: "Pending",
    applicantMessage: "I am interested in this property as it's close to my university. I am a clean and responsible tenant.",
    responseMessage: null,
    documents: []
  },
  {
    id: 3,
    propertyTitle: "Shared Student House",
    propertyLocation: "Greek Row",
    propertyPrice: "₱9,500/month",
    landlordName: "Jennifer Martinez",
    checkInDate: "August 10, 2024",
    moveInDate: "August 10, 2024",
    appliedDate: "March 10, 2024",
    status: "Rejected",
    applicantMessage: "Hi! I'm looking for a place to stay with other students. I'm quiet and respectful of shared spaces.",
    responseMessage: "Thank you for your interest. Unfortunately, we have decided to move forward with another applicant who better fits our requirements.",
    documents: []
  }
];
