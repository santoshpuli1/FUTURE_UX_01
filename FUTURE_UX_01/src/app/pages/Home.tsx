import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function Home() {
  const interiorImage = "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwZmluZSUyMGRpbmluZyUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvciUyMGVsZWdhbnR8ZW58MXx8fHwxNzc5Njk0MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const michelinFood = "https://images.unsplash.com/photo-1600663791817-d74f5196ba29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNoZWxpbiUyMHN0YXIlMjBmb29kJTIwcGxhdGluZyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzc5Njk0MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const gourmetDish = "https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZW5kJTIwZ291cm1ldCUyMGRpc2h8ZW58MXx8fHwxNzc5Njk0MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const steakImage = "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwZmluZSUyMGRpbmluZyUyMHN0ZWFrfGVufDF8fHx8MTc3OTY5NDIzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const seafoodImage = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwc2VhZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzc5NjI0NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const dessertImage = "https://images.unsplash.com/photo-1703849133132-98c23595b981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmluZSUyMGRpbmluZyUyMGRlc3NlcnR8ZW58MXx8fHwxNzc5Njk0MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const galleryImages = [michelinFood, gourmetDish, steakImage, dessertImage, seafoodImage];

  return (
    <div className="flex flex-col w-full bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={interiorImage} 
            alt="Classic Fine Dining Interior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-[#0F0F0F]/60 to-[#0F0F0F]/90" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] uppercase tracking-[0.3em] text-xs font-semibold">Fine Dining</span>
            <div className="h-[1px] w-12 bg-[#FF6B00]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-['Playfair_Display',serif] mb-6 tracking-tight text-white drop-shadow-lg"
          >
            Art on a <span className="text-white italic">Plate</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#BDBDBD] mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
          >
            A classic culinary destination where world-class ingredients are transformed into unforgettable gastronomic experiences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/reservations" 
              className="bg-[#FF6B00] hover:bg-[#E56000] text-white px-10 py-4 rounded-none uppercase tracking-[0.2em] text-sm font-semibold transition-all duration-300 w-full sm:w-auto text-center"
            >
              Book a Table
            </Link>
            <Link
              to="/menu"
              className="bg-white/10 border border-white/80 hover:border-white hover:bg-white hover:text-[#0F0F0F] text-white px-10 py-4 rounded-none uppercase tracking-[0.2em] text-sm font-semibold transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-sm"
            >
              View Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Culinary Masterpieces Gallery - Food as the main attraction */}
      <section className="py-32 bg-[#0F0F0F]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#FF6B00]" />
              <span className="text-[#FF6B00] uppercase tracking-widest text-sm font-medium">The Attraction</span>
              <div className="h-px w-12 bg-[#FF6B00]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white leading-tight">
              Culinary Masterpieces
            </h2>
            <p className="text-[#BDBDBD] mt-6 max-w-2xl mx-auto">
              Every plate is meticulously crafted by our executive chefs, ensuring that your eyes feast long before your palate does.
            </p>
          </div>

          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
            <Masonry gutter="24px">
              {galleryImages.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="overflow-hidden group"
                >
                  <img
                    src={src}
                    alt={`Gourmet culinary creation ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 border border-[#333]"
                  />
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-24 bg-[#0F0F0F] border-t border-[#333]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#FF6B00]" />
              <span className="text-[#FF6B00] uppercase tracking-widest text-sm font-medium">Chef's Selection</span>
              <div className="h-px w-12 bg-[#FF6B00]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white leading-tight">
              Signature Creations
            </h2>
            <p className="text-[#BDBDBD] mt-6 max-w-2xl mx-auto">
              Discover our most celebrated dishes, each crafted with aromatic spices and premium ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Tandoori Platter", desc: "Selection of grilled meats with aromatic spices", img: steakImage },
              { name: "Seafood Delicacy", desc: "Fresh catch of the day with coastal spices", img: seafoodImage },
              { name: "Signature Dessert", desc: "Traditional sweet with a modern twist", img: dessertImage }
            ].map((dish, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden border border-[#333] mb-4">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-['Playfair_Display',serif] text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                  {dish.name}
                </h3>
                <p className="text-[#BDBDBD] text-sm">{dish.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E56000] text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-colors"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#151515] border-y border-[#333]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#FF6B00]" />
                <span className="text-[#FF6B00] uppercase tracking-widest text-sm font-medium">The Experience</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white mb-8 leading-tight">
                A classic ambiance <br/>for modern tastes
              </h2>
              <p className="text-[#BDBDBD] mb-6 leading-relaxed">
                Step into a world where classic professional service meets unparalleled gastronomic creativity. Our dining room is designed to provide an intimate, elegant backdrop that allows the food to truly shine.
              </p>
              <p className="text-[#BDBDBD] mb-10 leading-relaxed">
                With a carefully curated wine list, crisp white linens, and an unwavering commitment to detail, Spice Garden promises a dining experience that honors the timeless traditions of fine hospitality.
              </p>
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-[#FF6B00] transition-colors group tracking-widest uppercase text-sm"
              >
                <span>Reserve your table</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 w-full relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative z-10 p-2 bg-[#0F0F0F] border border-[#333]">
                <img
                  src={michelinFood}
                  alt="Chef plating food"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-[#FF6B00]/30 z-0 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#0F0F0F]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#FF6B00]" />
              <span className="text-[#FF6B00] uppercase tracking-widest text-sm font-medium">Guest Reviews</span>
              <div className="h-px w-12 bg-[#FF6B00]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white leading-tight">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                review: "An extraordinary dining experience! The spices are perfectly balanced and the presentation is stunning. Truly a gem in Delhi.",
                rating: 5
              },
              {
                name: "Rahul Verma",
                review: "Impeccable service and exceptional food. Every dish tells a story. The Tandoori Platter is a must-try!",
                rating: 5
              },
              {
                name: "Anjali Mehta",
                review: "The ambiance is elegant and the flavors are authentic yet innovative. Perfect for special occasions.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#151515] border border-[#333] p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FF6B00] text-[#FF6B00]" />
                  ))}
                </div>
                <p className="text-[#BDBDBD] mb-6 leading-relaxed italic">
                  "{testimonial.review}"
                </p>
                <p className="text-white font-['Playfair_Display',serif] text-lg">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
