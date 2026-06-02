import Header from '../../components/Admin Components/AdminHeader/Header';
import VendorManagement from '../../components/Admin Components/VendorManagement';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function VendorManagementPage() {
  return (
    <div>
      <Header />
      <VendorManagement />
      <Footer />
      <FooterEnd/>
    </div>
  );
}
