import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, ChevronDown } from "lucide-react";

type ReservationFormData = {
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export function Reservations() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ReservationFormData>();

  const onSubmit = async (data: ReservationFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Reservation requested:", data);
    
    toast.success("Reservation request sent!", {
      description: `We'll see you on ${data.date} at ${data.time} for ${data.guests} guests. A confirmation email has been sent to ${data.email}.`,
      duration: 5000,
      style: { background: '#151515', color: '#fff', border: '1px solid #333' }
    });
    
    reset();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col w-full bg-[#0F0F0F] min-h-screen pt-24 text-white">
      <div className="container mx-auto px-6 max-w-4xl py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white mb-4">Make a Reservation</h1>
          <p className="text-[#BDBDBD] max-w-lg mx-auto">
            Join us for an unforgettable dining experience. For parties larger than 8, please contact the restaurant directly.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#151515] p-8 md:p-12 rounded-sm shadow-2xl border border-[#333]"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Booking Details */}
            <div>
              <h3 className="text-lg font-['Playfair_Display',serif] text-white border-b border-[#333] pb-2 mb-6">Reservation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF6B00]" />
                    Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    {...register("date", { required: "Date is required" })}
                    className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF6B00]" />
                    Time
                  </label>
                  <div className="relative">
                    <select
                      {...register("time", { required: "Time is required" })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors appearance-none pr-10"
                    >
                      <option value="">Select a time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#BDBDBD] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FF6B00]" />
                    Guests
                  </label>
                  <div className="relative">
                    <select
                      {...register("guests", { required: "Number of guests is required" })}
                      className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors appearance-none pr-10"
                    >
                      <option value="">Select party size</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#BDBDBD] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-['Playfair_Display',serif] text-white border-b border-[#333] pb-2 mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#FF6B00]" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FF6B00]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
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
                    placeholder="(555) 123-4567"
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#BDBDBD] mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Allergies, dietary restrictions, special occasions..."
                    {...register("notes")}
                    className="w-full px-4 py-3 bg-[#0F0F0F] text-white border border-[#333] focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#333]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6B00] hover:bg-[#E56000] text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Confirm Reservation"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
