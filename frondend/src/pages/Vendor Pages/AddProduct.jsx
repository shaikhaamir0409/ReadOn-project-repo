import AddProducts from '../../components/Admin Components/AddProducts';
import Header from '../../components/Vendor Components/VendorHeader/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function AddProduct() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <AddProducts />
      <Footer />
      <FooterEnd/>
    </div>
  );
}
