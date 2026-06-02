import Header from '../../components/Admin Components/AdminHeader/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';
import Blogs from '../../components/Admin Components/Manage Blogs';

export default function ManageBlogsPage() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <Blogs />
      <Footer />
      <FooterEnd/>
    </div>
  );
}
