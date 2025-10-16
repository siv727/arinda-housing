export default function Bookings(){
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Bookings Management</h1>
            <p className="text-gray-600">Manage all tenant bookings and reservations for your properties.</p>

            
            
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Bookings</h2>
                <ul className="divide-y divide-gray-200">
                    <li className="py-3 flex justify-between">
                        <span className="text-gray-700">John Cruz - Unit 301</span>
                        <span className="text-gray-500 text-sm">2 days ago</span>
                    </li>
                    <li className="py-3 flex justify-between">
                        <span className="text-gray-700">Anna Santos - Studio B</span>
                        <span className="text-gray-500 text-sm">5 days ago</span>
                    </li>
                    <li className="py-3 flex justify-between">
                        <span className="text-gray-700">Mark Tan - Room 204</span>
                        <span className="text-gray-500 text-sm">1 week ago</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}