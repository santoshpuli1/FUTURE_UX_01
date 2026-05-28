import { motion } from "motion/react";
import { Link } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const GST_NUMBER = "07AAACS2781N1ZT";
const CGST_RATE = 0.025;
const SGST_RATE = 0.025;

export function Cart() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  const cgst = subtotal * CGST_RATE;
  const sgst = subtotal * SGST_RATE;
  const totalGst = cgst + sgst;
  const total = subtotal + totalGst;

  if (items.length === 0) {
    return (
      <div className="flex flex-col w-full bg-[#0F0F0F] min-h-screen pt-24 text-white">
        <div className="container mx-auto px-6 max-w-4xl py-24 text-center">
          <ShoppingBag className="w-24 h-24 text-[#333] mx-auto mb-6" />
          <h1 className="text-3xl font-['Playfair_Display',serif] text-white mb-4">Your Cart is Empty</h1>
          <p className="text-[#BDBDBD] mb-8">Add some delicious items from our menu to get started!</p>
          <Link
            to="/menu"
            className="inline-block bg-[#FF6B00] hover:bg-[#E56000] text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#0F0F0F] min-h-screen pt-24 text-white pb-24">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white mb-2">Your Order</h1>
          <p className="text-[#BDBDBD]">{items.length} {items.length === 1 ? 'item' : 'items'} in cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#151515] border border-[#333] p-4 flex gap-4"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-['Playfair_Display',serif] text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-[#BDBDBD] mb-3 line-clamp-1">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-[#0F0F0F] border border-[#333] hover:border-[#FF6B00] flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-[#0F0F0F] border border-[#333] hover:border-[#FF6B00] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[#FF6B00] font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#BDBDBD] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#151515] border border-[#333] p-6 sticky top-32"
            >
              <h2 className="text-2xl font-['Playfair_Display',serif] text-white mb-6 border-b border-[#333] pb-4">
                Order Summary
              </h2>

              {/* Itemized Bill */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#BDBDBD]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#333] pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#BDBDBD]">Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#BDBDBD]">CGST (2.5%)</span>
                  <span className="text-white">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#BDBDBD]">SGST (2.5%)</span>
                  <span className="text-white">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#333]">
                  <span className="text-[#BDBDBD]">Total GST (5%)</span>
                  <span className="text-white">₹{totalGst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold border-t border-[#333] pt-4 mb-6">
                <span className="text-white">Total Amount</span>
                <span className="text-[#FF6B00]">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="text-xs text-[#BDBDBD] mb-6 pb-6 border-b border-[#333]">
                <p>GST No: {GST_NUMBER}</p>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center bg-[#FF6B00] hover:bg-[#E56000] text-white px-6 py-4 uppercase tracking-widest text-sm font-semibold transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/menu"
                className="w-full block text-center mt-3 border border-[#333] hover:border-[#FF6B00] text-white px-6 py-3 uppercase tracking-widest text-xs font-semibold transition-colors"
              >
                Add More Items
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
