'use client'; // यह जरूरी है क्योंकि हम Logout के लिए बटन का इस्तेमाल कर रहे हैं
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // लॉगआउट के बाद सीधे लॉगिन पेज पर भेजें
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/admin" className="block hover:text-blue-200">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/tours" className="block hover:text-blue-200">Manage Tours</Link>
            </li>
            <li>
              <Link href="/admin/leads" className="block hover:text-blue-200">View Leads</Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition w-full"
        >
          Logout
        </button>
      </nav>

      {/* Content Area */}
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}