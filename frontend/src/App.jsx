import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext"; 

import Splash from "./pages/Splash.jsx"; 
import Login from "./pages/Login.jsx"; 
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Profile from "./pages/Profile.jsx";
import Sneakers from "./pages/Sneakers.jsx";
import Apparel from "./pages/Apparel.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Layout from "./components/Layout.jsx"; 
import Sale from "./pages/Sale.jsx";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

function App() {
  return (
    // Provider membungkus seluruh aplikasi
    <CartProvider> 
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} /> 

            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/sneakers" element={<Sneakers />} />
              <Route path="/apparel" element={<Apparel />} /> 
              <Route path="/sale" element={<Sale />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:type/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;