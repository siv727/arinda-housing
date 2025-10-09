export default function Steps() {
  const steps = [
    {
      number: 1,
      title: "Create Your Listing",
      description: "Upload photos, add property details, and set your rental terms. Our verification team ensures quality standards."
    },
    {
      number: 2,
      title: "Connect with Students",
      description: "Receive applications from verified students, review their profiles, and communicate directly through our platform."
    },
    {
      number: 3,
      title: "Manage & Earn",
      description: "Use our dashboard to track payments, manage maintenance requests, and monitor your property performance."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="relative">
        <ol className="relative space-y-12">
          {steps.map((step, index) => (
            <li key={step.number} className="relative pl-16">
              {/* Connecting line with arrow - hidden for last item */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5" style={{ height: 'calc(100% + 3rem)' }}>
                  {/* Dashed line */}
                  <div className="h-full border-l-2 border-dashed border-[#F35E27]" />
                  
                  {/* Arrow at bottom of line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-10 border-r-10 border-t-18 border-l-transparent border-r-transparent border-t-[#F35E27]" />
                  </div>
                </div>
              )}
              
              {/* Step number circle */}
              <span className="absolute translate-y-10 left-0 top-0 flex items-center justify-center w-10 h-10 bg-[#F35E27] text-white text-lg font-bold rounded-full shadow-lg z-10">
                {step.number}
              </span>
              
              {/* Content */}
              <div className="bg-white p-8 rounded-lg border border-black transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}