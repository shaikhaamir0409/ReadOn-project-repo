import ProfileStatus from '../../components/Vendor Components/OrderStatusManagement';
import Header from '../../components/Vendor Components/VendorHeader/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function OrderStatusManagementPage() {
  return (
    <div style={{ paddingTop: '3%' }}>
      <Header />
      <ProfileStatus />
      <Footer />
      <FooterEnd />
    </div>
  );
}
