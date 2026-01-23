
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixe en haut */}
      <div className="sticky top-0 z-50">
        {/* <Header /> */}
      </div>

      <div className="flex">
        {/* Sidebar fixe sur desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r">
            <Sidebar />
          </div>
        </div>

        {/* Contenu principal */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}