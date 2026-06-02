import UserProductHistory from '../../components/Common Components/UserProductHistory';
import Header from '../../components/Common Components/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function UserProductHistorys() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <UserProductHistory />
      <Footer />
      <FooterEnd />
    </div>
  );
}
