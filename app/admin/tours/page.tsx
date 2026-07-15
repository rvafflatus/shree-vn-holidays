import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function ManageTours() {
  const { data: tours } = await supabase.from('tours').select('*');

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">टूर मैनेज करें</h1>
        <Link href="/admin/tours/new" className="bg-green-600 text-white px-4 py-2 rounded">
          + नया टूर जोड़ें
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border">Title</th>
            <th className="p-4 border">Price</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours?.map((tour: any) => (
            <tr key={tour.id} className="border-b">
              <td className="p-4 border">{tour.title}</td>
              <td className="p-4 border">₹{tour.price}</td>
              <td className="p-4 border">
                <Link href={`/admin/tours/edit/${tour.id}`} className="text-blue-600 mr-4">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}