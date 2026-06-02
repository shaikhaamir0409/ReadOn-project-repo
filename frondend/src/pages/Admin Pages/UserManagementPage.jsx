import Header from '../../components/Admin Components/AdminHeader/Header';
import UserManagement from '../../components/Admin Components/UserManagement';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function UserManagementPage() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <UserManagement />
      <Footer />
      <FooterEnd/>
    </div>
  );
}
