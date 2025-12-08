import { useEffect } from "react";

export default function SizeGuide({ isOpen, onClose, type }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-in-up">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-20">
                    <h2 className="text-xl font-black uppercase tracking-wide">
                        Size Guide - {type === "apparel" ? "Apparel" : "Sneakers"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {type === "apparel" ? (
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-lg mb-4">Men's Tops (T-Shirts, Hoodies, Jackets)</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg">Size</th>
                                                <th className="px-4 py-3">Chest (cm)</th>
                                                <th className="px-4 py-3">Waist (cm)</th>
                                                <th className="px-4 py-3 rounded-r-lg">Hips (cm)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr>
                                                <td className="px-4 py-3 font-bold">XS</td>
                                                <td className="px-4 py-3">80 - 88</td>
                                                <td className="px-4 py-3">65 - 73</td>
                                                <td className="px-4 py-3">80 - 88</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">S</td>
                                                <td className="px-4 py-3">88 - 96</td>
                                                <td className="px-4 py-3">73 - 81</td>
                                                <td className="px-4 py-3">88 - 96</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">M</td>
                                                <td className="px-4 py-3">96 - 104</td>
                                                <td className="px-4 py-3">81 - 89</td>
                                                <td className="px-4 py-3">96 - 104</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">L</td>
                                                <td className="px-4 py-3">104 - 112</td>
                                                <td className="px-4 py-3">89 - 97</td>
                                                <td className="px-4 py-3">104 - 112</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">XL</td>
                                                <td className="px-4 py-3">112 - 124</td>
                                                <td className="px-4 py-3">97 - 109</td>
                                                <td className="px-4 py-3">112 - 120</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">XXL</td>
                                                <td className="px-4 py-3">124 - 136</td>
                                                <td className="px-4 py-3">109 - 121</td>
                                                <td className="px-4 py-3">120 - 128</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-4">How to Measure</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm">1. Chest</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Measure around the fullest part of your chest, keeping the tape measure horizontal.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm">2. Waist</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Measure around the narrowest part (typically where your body bends side to side), keeping the tape horizontal.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm">3. Hips</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Measure around the fullest part of your hips, keeping the tape horizontal.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-lg mb-4">Sneakers Size Chart</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-center">
                                        <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg">EU</th>
                                                <th className="px-4 py-3">US (Men)</th>
                                                <th className="px-4 py-3">US (Women)</th>
                                                <th className="px-4 py-3">UK</th>
                                                <th className="px-4 py-3 rounded-r-lg">CM</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr>
                                                <td className="px-4 py-3 font-bold">38</td>
                                                <td className="px-4 py-3">5.5</td>
                                                <td className="px-4 py-3">7</td>
                                                <td className="px-4 py-3">5</td>
                                                <td className="px-4 py-3">24</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">39</td>
                                                <td className="px-4 py-3">6.5</td>
                                                <td className="px-4 py-3">8</td>
                                                <td className="px-4 py-3">6</td>
                                                <td className="px-4 py-3">24.5</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">40</td>
                                                <td className="px-4 py-3">7</td>
                                                <td className="px-4 py-3">8.5</td>
                                                <td className="px-4 py-3">6</td>
                                                <td className="px-4 py-3">25</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">41</td>
                                                <td className="px-4 py-3">8</td>
                                                <td className="px-4 py-3">9.5</td>
                                                <td className="px-4 py-3">7</td>
                                                <td className="px-4 py-3">26</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">42</td>
                                                <td className="px-4 py-3">8.5</td>
                                                <td className="px-4 py-3">10</td>
                                                <td className="px-4 py-3">7.5</td>
                                                <td className="px-4 py-3">26.5</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">43</td>
                                                <td className="px-4 py-3">9.5</td>
                                                <td className="px-4 py-3">11</td>
                                                <td className="px-4 py-3">8.5</td>
                                                <td className="px-4 py-3">27.5</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">44</td>
                                                <td className="px-4 py-3">10</td>
                                                <td className="px-4 py-3">11.5</td>
                                                <td className="px-4 py-3">9</td>
                                                <td className="px-4 py-3">28</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">45</td>
                                                <td className="px-4 py-3">11</td>
                                                <td className="px-4 py-3">12.5</td>
                                                <td className="px-4 py-3">10</td>
                                                <td className="px-4 py-3">29</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-bold">46</td>
                                                <td className="px-4 py-3">12</td>
                                                <td className="px-4 py-3">13.5</td>
                                                <td className="px-4 py-3">11</td>
                                                <td className="px-4 py-3">30</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3 items-start">
                                <span className="text-xl">💡</span>
                                <p className="text-xs text-orange-800 leading-relaxed">
                                    <strong>Pro Tip:</strong> If you are in between sizes, we recommend sizing up for a more comfortable fit, especially for running shoes.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
