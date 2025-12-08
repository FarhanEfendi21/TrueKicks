import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Reviews({ productId, productType }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Ambil user dari localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${API_URL}/api/reviews/${productId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to write a review");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        setSubmitting(true);
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL;
            await axios.post(`${API_URL}/api/reviews`, {
                user_id: user.id,
                product_id: productId,
                product_type: productType,
                rating,
                comment,
            });

            toast.success("Review submitted!");
            setComment("");
            setRating(5);
            fetchReviews(); // Refresh list
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

            {/* Form Review */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                <h3 className="text-lg font-bold mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-2xl transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-black outline-none"
                            rows="3"
                            placeholder="Share your thoughts..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-black text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>

            {/* List Reviews */}
            {loading ? (
                <div className="text-center text-gray-500">Loading reviews...</div>
            ) : reviews.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No reviews yet. Be the first to review!
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs">
                                        {review.users?.full_name?.charAt(0) || "U"}
                                    </div>
                                    <span className="font-bold text-sm">
                                        {review.users?.full_name || "Anonymous"}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex text-yellow-400 text-sm mb-2">
                                {"★".repeat(review.rating)}
                                <span className="text-gray-200">
                                    {"★".repeat(5 - review.rating)}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
