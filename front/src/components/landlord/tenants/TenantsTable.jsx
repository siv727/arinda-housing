import React, { useState, useEffect } from 'react'
import TenantSheet from '@/components/landlord/tenants/TenantSheet'
import { properties as mockProperties } from '@/data/mockProperties'

const PaymentBadge = ({ status }) => {
  const map = {
    Paid: 'bg-green-100 text-green-700',
    'Due Soon': 'bg-yellow-100 text-yellow-700',
    Overdue: 'bg-red-100 text-red-700',
  }
  const dot = {
    Paid: "bg-green-500",
    'Due Soon': "bg-yellow-500",
    Overdue: "bg-red-500",
  };
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          dot[status] || "bg-gray-400"
        }`}
      ></span>
      {status}
    </div>
  );
}

const TenantsTable = ({ bookings = [], onEndLease = () => {} }) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [paymentMap, setPaymentMap] = useState({})

  useEffect(() => {
    // initialize payment statuses from bookings (default to 'Due Soon')
    const map = {}
    bookings.forEach(b => {
      map[b.id] = b.paymentStatus || 'Due Soon'
    })
    setPaymentMap(map)
  }, [bookings])

  const openSheet = (b) => { setSelected(b); setSheetOpen(true) }

  // helper to find property price by title
  const findPrice = (title) => {
    const p = mockProperties.find(x => x.title === title)
    return p?.price || '-'
  }

  const updatePayment = (id, status) => {
    setPaymentMap(prev => ({ ...prev, [id]: status }))
  }

  return (
    <>
      <div className="overflow-auto bg-white border border-[#EAD1C7] rounded-lg">
        <table className="min-w-full divide-y divide-[#EAD1C7]">
          <thead className="bg-[#FFF8F2]">
            <tr className="text-sm">
              <th className="px-6 py-4 text-left font-medium">Tenant</th>
              <th className="px-6 py-4 text-left font-medium">Property</th>
              <th className="px-6 py-4 text-left font-medium">Monthly Rent</th>
              <th className="px-6 py-4 text-left font-medium">Payment Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {bookings.map(b => (
              <tr key={b.id} onClick={() => openSheet(b)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-[22px] whitespace-nowrap align-top">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={b.tenant?.avatar} alt={b.tenant?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{b.tenant.name}</div>
                      <div className="text-xs text-gray-500">{b.tenant.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-[22px] whitespace-nowrap align-top">
                  <div className="text-sm font-semibold">{b.property.title}</div>
                  <div className="text-xs text-gray-500">{b.property.address}</div>
                </td>



                <td className="px-6 py-[22px] whitespace-nowrap align-top text-sm">{findPrice(b.property.title)}</td>

                <td className="px-6 py-[22px] whitespace-nowrap align-top">
                  <PaymentBadge status={paymentMap[b.id] || 'Due Soon'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TenantSheet open={sheetOpen} onOpenChange={setSheetOpen} booking={selected} paymentStatus={selected ? (paymentMap[selected.id] || 'Due Soon') : 'Due Soon'} onUpdatePayment={updatePayment} onEndLease={(b) => { onEndLease(b); setSheetOpen(false); }} />
    </>
  )
}

export default TenantsTable