import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  
  const searchKeyword = location.state?.keyword || "";
  const [searchTerm, setSearchTerm] = useState(searchKeyword);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sneakers");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.keyword && location.state.keyword !== searchTerm) {
        setSearchTerm(location.state.keyword);
    }

    if (searchTerm) {
      const results = products.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products, location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-poppins overflow-x-hidden">
      <Navbar />

      <div className="pt-32 pb-16 max-w-7xl mx-auto px-6"> 
        
        <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">CATALOG</h1>
            {searchTerm && (
                <p className="text-gray-500">
                    Showing results for: <span className="font-bold text-black">"{searchTerm}"</span>
                </p>
            )}
        </div>

        {/* Grid Produk */}
        {loading ? (
             <p className="text-center mt-20">Loading catalog...</p>
        ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                   <div className="relative h-[180px] bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                     <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-2 py-1 rounded-full">{item.category}</span>
                     <img src={item.image_url} className="w-[85%] h-[85%] object-contain mix-blend-multiply" alt={item.name} />
                   </div>
                   <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                   <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                   <div className="flex items-center justify-between mt-3">
                     <p className="text-[#FF5500] font-bold text-sm">Rp {(item.price / 1000).toLocaleString()}K</p>
                     <button className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">+</button>
                   </div>
                </div>
              ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-xl font-bold text-gray-400">No products found.</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-[#FF5500] font-bold hover:underline">
                    Clear Search
                </button>
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}