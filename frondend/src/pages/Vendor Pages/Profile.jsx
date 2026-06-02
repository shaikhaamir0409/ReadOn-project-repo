import Header from '../../components/Vendor Components/VendorHeader/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';
import ProfileStatus from '../../pages/User Pages/ProfileStatus';
export default function Profile() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <ProfileStatus />
      <Footer />
      <FooterEnd />
    </div>
  );
}
