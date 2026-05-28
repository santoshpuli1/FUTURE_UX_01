import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, CreditCard, Wallet } from "lucide-react";
import { useCart } from "../context/CartContext";

const GST_NUMBER = "07AAACS2781N1ZT";
const CGST_RATE = 0.025;
const SGST_RATE = 0.025;

type CheckoutFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: "razorpay" | "cod";
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Checkout() {
  const { items, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormData>({
    defaultValues: {
      paymentMethod: "razorpay"
    }
  });

  const paymentMethod = watch("paymentMethod");

  const subtotal = getSubtotal();
  const cgst = subtotal * CGST_RATE;
  const sgst = subtotal * SGST_RATE;
  const totalGst = cgst + sgst;
  const total = subtotal + totalGst;

  if (items.length === 0) {
    navigate("/menu");
    return null;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData: CheckoutFormData) => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      return false;
    }

    const options = {
      key: "rzp_test_dummy_key",
      amount: Math.round(total * 100),
      currency: "INR",
      name: "Spice Garden",
      description: "Restaurant Order Payment",
      image: "/logo.png",
      handler: function (response: any) {
        saveOrder(orderData, response.razorpay_payment_id);
      },
      prefill: {
        name: orderData.name,
        email: orderData.email,
        contact: orderData.phone,
      },
      notes: {
        address: `${orderData.address}, ${orderData.city} - ${orderData.pincode}`,
      },
      theme: {
        color: "#FF6B00",
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          toast.error("Payment cancelled");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    return true;
  };

  const saveOrder = async (orderData: CheckoutFormData, paymentId?: string) => {
    try {
      const orderPayload = {
        orderId: `ORD${Date.now()}`,
        customer: {
          name: orderData.name,
          email: orderData.email,
          phone: orderData.phone,
          address: `${orderData.address}, ${orderData.city} - ${orderData.pincode}`,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        billing: {
          subtotal,
          cgst,
          sgst,
          totalGst,
          total,
          gstNumber: GST_NUMBER,
        },
        payment: {
          method: orderData.paymentMethod,
          status: orderData.paymentMethod === "cod" ? "pending" : "completed",
          transactionId: paymentId || null,
        },
        status: "pending",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'}/functions/v1/make-server-88060210/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        clearCart();
        toast.success("Order placed successfully!", {
          description: `Order ID: ${orderPayload.orderId}. You will receive a confirmation email shortly.`,
          duration: 6000,
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Failed to save order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Order placed but failed to save. Please contact support with your payment details.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    if (data.paymentMethod === "razorpay") {
      await handleRazorpayPayment(data);
    } else {
      await saveOrder(data);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#0F0F0F] min-h-screen pt-24 text-white pb-24">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white mb-2">Checkout</h1>
          <p className="text-[#BDBDBD]">Complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#151515] border border-[#333] p-8 space-y-8"
            >
              {/* Customer Details */}
              <div>
                <h2 className="text-xl font-['Playfair_Display',serif] text-white mb-6 border-b border-[#333] pb-3">
                  Customer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#FF6B00]" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#FF6B00]" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#FF6B00]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone", { required: "Phone is required" })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h2 className="text-xl font-['Playfair_Display',serif] text-white mb-6 border-b border-[#333] pb-3">
                  Delivery Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF6B00]" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      {...register("address", { required: "Address is required" })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                      placeholder="123 Main Street, Apartment 4B"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#BDBDBD] mb-2">City</label>
                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                        placeholder="New Delhi"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#BDBDBD] mb-2">PIN Code</label>
                      <input
                        type="text"
                        {...register("pincode", {
                          required: "PIN code is required",
                          pattern: { value: /^[0-9]{6}$/, message: "Invalid PIN code" }
                        })}
                        className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                        placeholder="110001"
                      />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-['Playfair_Display',serif] text-white mb-6 border-b border-[#333] pb-3">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 bg-[#0F0F0F] border border-[#333] cursor-pointer hover:border-[#FF6B00] transition-colors">
                    <input
                      type="radio"
                      value="razorpay"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-[#FF6B00]"
                    />
                    <CreditCard className="w-5 h-5 text-[#FF6B00]" />
                    <div className="flex-1">
                      <div className="text-white font-medium">Razorpay (UPI / Card / Wallet)</div>
                      <div className="text-xs text-[#BDBDBD]">Pay securely using UPI, Credit/Debit Card, or Wallet</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 bg-[#0F0F0F] border border-[#333] cursor-pointer hover:border-[#FF6B00] transition-colors">
                    <input
                      type="radio"
                      value="cod"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-[#FF6B00]"
                    />
                    <Wallet className="w-5 h-5 text-[#FF6B00]" />
                    <div className="flex-1">
                      <div className="text-white font-medium">Cash on Delivery</div>
                      <div className="text-xs text-[#BDBDBD]">Pay with cash when your order arrives</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#FF6B00] hover:bg-[#E56000] text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : paymentMethod === "cod" ? "Place Order" : "Pay Now"}
              </button>
            </motion.form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#151515] border border-[#333] p-6 sticky top-32"
            >
              <h2 className="text-xl font-['Playfair_Display',serif] text-white mb-6 border-b border-[#333] pb-4">
                Order Summary
              </h2>

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

              <div className="border-t border-[#333] pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#BDBDBD]">Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#BDBDBD]">CGST (2.5%)</span>
                  <span className="text-white">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#BDBDBD]">SGST (2.5%)</span>
                  <span className="text-white">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold border-t border-[#333] pt-4 mb-4">
                <span className="text-white">Total</span>
                <span className="text-[#FF6B00]">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="text-xs text-[#BDBDBD]">
                <p>GST No: {GST_NUMBER}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
