import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#0A0A0F' }}>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
