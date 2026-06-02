import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserDashboard from './UserDashboard';
import VendorDashboard from './VendorDashboard';
import AdminDashboard from './AdminDashboard';
import Product from './pages/User Pages/Products';
import Categories from './pages/User Pages/Categories';
import OrderStatus from './pages/User Pages/OrderStatus';
import UserProductHistorys from './pages/User Pages/UserProductHistorys';
import ProfilePage from './pages/User Pages/ProfilePage';
import AddProductVendor from './pages/Vendor Pages/AddProduct';
import SellerProfile from './pages/Vendor Pages/Profile';
import AddProduct from './pages/Admin Pages/AddProducts';
import AdminProfile from '../src/pages/Admin Pages/Profile';
import UsersManagement from './pages/Admin Pages/UserManagementPage';
import VendorsManagement from './pages/Admin Pages/VendorManagementPage';
import OrderStatusManagementPage from './pages/Vendor Pages/OrderStatusManagementPage';
import CategoryManagementPage from './pages/Admin Pages/CategoryManagementPage';
import ReviewPage from './pages/User Pages/ReviewPage';
import CartPage from './pages/User Pages/Cart';
import CheckoutPage from './pages/User Pages/Checkout';
import SearchForm from './components/Common Components/Header/SearchForm/index';
import BlogPage from './pages/User Pages/BlogPage';
import ManageBlogsPage from './pages/Admin Pages/Blogs';
import './App.css';
import RegisterPage from './RegisterPage';
import WishlistPage from './pages/User Pages/WishlistPage';
import CatewiseProducts from './components/Common Components/CatewiseProducts';
import 'antd/dist/reset.css'; // for Ant Design v5

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  return (
    <Router>
      <div>
        {/* Search Bar (Visible on all pages except login) */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/buyer-home" element={<UserDashboard />} />
          <Route path="/seller-home" element={<VendorDashboard />} />
          <Route path="/admin-home" element={<AdminDashboard />} />

          <Route path="/" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CatewiseProducts />} />
          {/* User Pages */}
          <Route path="/buyer-home/product" element={<Product />} />
          <Route path="/buyer-home/categories" element={<Categories />} />
          <Route path="/buyer-home/order" element={<OrderStatus />} />
          <Route
            path="/buyer-home/purchase-book-history"
            element={<UserProductHistorys />}
          />
          <Route path="/buyer-home/profile" element={<ProfilePage />} />
          <Route path="/buyer-home/review" element={<ReviewPage />} />
          <Route path="/buyer-home/cart" element={<CartPage />} />
          <Route path="/buyer-home/wishlist" element={<WishlistPage />} />
          <Route path="/buyer-home/checkout" element={<CheckoutPage />} />
          <Route path="/buyer-home/blogs" element={<BlogPage />} />

          {/* Vendor Pages */}
          <Route
            path="/seller-home/add-product"
            element={<AddProductVendor />}
          />
          <Route
            path="/seller-home/seller-profiler"
            element={<SellerProfile />}
          />
          <Route
            path="/seller-home/manage-order-status"
            element={<OrderStatusManagementPage />}
          />
          {/* Admin Pages */}
          <Route path="/admin-home/add-product" element={<AddProduct />} />
          <Route path="/admin-home/admin-profile" element={<AdminProfile />} />
          <Route
            path="/admin-home/buyer-management"
            element={<UsersManagement />}
          />
          <Route
            path="/admin-home/seller-management"
            element={<VendorsManagement />}
          />
          <Route
            path="/admin-home/manage-categories"
            element={<CategoryManagementPage />}
          />
          <Route
            path="/admin-home/manage-blogs"
            element={<ManageBlogsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
