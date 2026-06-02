import ProfileStatus from './ProfileStatus';
import Header from '../../components/Common Components/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function ProfilePage() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <ProfileStatus />
      <Footer />
      <FooterEnd />
    </div>
  );
}
