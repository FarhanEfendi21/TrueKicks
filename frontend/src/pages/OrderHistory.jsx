import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                navigate("/login");
                return;
            }

            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${API_URL}/api/orders/user/${user.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "processing":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "shipped":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "delivered":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            <Navbar />
            <div className="pt-32 pb-20 max-w-5xl mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-black mb-8">Order History</h1>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} height="150px" className="rounded-2xl" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <p className="text-xl font-bold text-gray-400 mb-4">
                            No orders found
                        </p>
                        <button
                            onClick={() => navigate("/sneakers")}
                            className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                                            Order ID: #{order.id}
                                        </p>
                                        <p className="text-sm font-medium text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString("id-ID", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                        <p className="font-black text-xl">
                                            Rp {(order.total_price / 1000).toLocaleString()}K
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4">
                                    {order.items &&
                                        order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
                                            >
                                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-[90%] h-[90%] object-contain mix-blend-multiply"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        Size: {item.size} | Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-bold text-sm">
                                                    Rp {(item.price / 1000).toLocaleString()}K
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
