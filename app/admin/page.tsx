// app/admin/page.tsx
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-10 pt-20">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link href="/admin/leads" className="bg-blue-900 text-white p-8 rounded-xl text-center font-bold hover:bg-blue-800">
          View All Leads
        </Link>
        <Link href="/admin/tours" className="bg-green-700 text-white p-8 rounded-xl text-center font-bold hover:bg-green-600">
          Manage Tours
        </Link>
      </div>
    </div>
  );
}