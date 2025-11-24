import { createContext, useState, useContext, useEffect } from "react";

// 1. Buat Context
const CartContext = createContext();

// 2. Buat Custom Hook agar mudah dipanggil
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Buat Provider (Penyedia Data)
export const CartProvider = ({ children }) => {
  // Cek LocalStorage saat awal load agar data tidak hilang saat refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan ke LocalStorage setiap kali keranjang berubah
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fungsi: Tambah ke Keranjang
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Cek apakah barang dengan ID dan Size yang sama sudah ada?
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        // Jika ada, tambah quantity-nya saja
        return prevItems.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Jika belum ada, masukkan sebagai item baru
        return [...prevItems, product];
      }
    });
  };

  // Fungsi: Hapus dari Keranjang
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Fungsi: Update Quantity (+ / -)
  const updateQuantity = (id, size, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Hitung Total Harga & Total Item
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

const clearCart = () => {
    setCartItems([]); // Mengosongkan state
    localStorage.removeItem("cartItems"); // Hapus dari penyimpanan lokal
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalPrice, 
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};