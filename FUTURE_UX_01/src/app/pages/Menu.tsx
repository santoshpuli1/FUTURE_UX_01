import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const menuItems = {
  starters: [
    {
      name: "Wagyu Beef Tartare",
      description: "Quail egg, capers, house mustard, toasted brioche",
      price: "₹1,200",
      image: "https://images.unsplash.com/photo-1676664778856-b48a7d87d831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwdGFydGFyZSUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzc5Njk0NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Heirloom Tomato Salad",
      description: "Burrata, basil oil, aged balsamic, microgreens",
      price: "₹850",
      image: "https://images.unsplash.com/photo-1615802546508-f992bc087b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwdG9tYXRvJTIwc2FsYWQlMjBwbGF0aW5nfGVufDF8fHx8MTc3OTY5NDQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Seared Scallops",
      description: "Cauliflower purée, pancetta crisp, brown butter",
      price: "₹1,450",
      image: "https://images.unsplash.com/photo-1621327017866-6fb07e6c96ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFyZWQlMjBzY2FsbG9wcyUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzc5Njk0NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Charred Octopus",
      description: "Romesco sauce, fingerling potatoes, smoked paprika",
      price: "₹1,300",
      image: "https://images.unsplash.com/photo-1561864030-767a4b8cd01f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFycmVkJTIwb2N0b3B1cyUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzc5Njk0NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Artisan Charcuterie Board",
      description: "Selection of cured meats, cheese, olives, artisan crackers",
      price: "₹950",
      image: "https://images.unsplash.com/photo-1771325788983-37461c7c2258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhcHBldGl6ZXJzJTIwc25hY2tzJTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3Nzk5NTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ],
  mains: [
    { 
      name: "Dry-Aged Ribeye", 
      description: "Pommes purée, asparagus, black garlic jus", 
      price: "₹3,500",
      image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWJleWUlMjBzdGVhayUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzc5Njk0NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      name: "Pan-Roasted Halibut", 
      description: "Saffron risotto, braised fennel, citrus beurre blanc", 
      price: "₹2,800",
      image: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwaGFsaWJ1dCUyMGZpc2glMjBwbGF0ZXxlbnwxfHx8fDE3Nzk2OTQ0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      name: "Duck Breast", 
      description: "Cherry gastrique, sweet potato fondant, swiss chard", 
      price: "₹3,200",
      image: "https://images.unsplash.com/photo-1616671285410-2a676a9a433d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWNrJTIwYnJlYXN0JTIwZmluZSUyMGRpbmluZyUyMHBsYXRpbmd8ZW58MXx8fHwxNzc5Njk0NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { 
      name: "Wild Mushroom Risotto", 
      description: "Carnaroli rice, porcini dust, aged parmesan", 
      price: "₹1,900",
      image: "https://images.unsplash.com/photo-1609770424775-39ec362f2d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkJTIwbXVzaHJvb20lMjByaXNvdHRvfGVufDF8fHx8MTc3OTY5NDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
  ],
  desserts: [
    {
      name: "Dark Chocolate Tart",
      description: "Sea salt, raspberry coulis, vanilla bean gelato",
      price: "₹850",
      image: "https://images.unsplash.com/photo-1626803775151-61d756612f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwdGFydCUyMGRlc3NlcnR8ZW58MXx8fHwxNzc5Njk0NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Lemon Basil Panna Cotta",
      description: "Macerated strawberries, pistachio crumble",
      price: "₹650",
      image: "https://images.unsplash.com/photo-1452968011964-24f8831c43c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5uYSUyMGNvdHRhJTIwZGVzc2VydCUyMHBsYXRpbmd8ZW58MXx8fHwxNzc5Njk0NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Artisan Cheese Board",
      description: "Selection of 3 cheeses, honeycomb, marcona almonds",
      price: "₹1,150",
      image: "https://images.unsplash.com/photo-1668094497457-29f4bd775c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwYm9hcmR8ZW58MXx8fHwxNzc5Njk0NDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
  ],
  beverages: [
    {
      name: "Fresh Orange Juice",
      description: "Freshly squeezed, pure and natural",
      price: "₹250",
      image: "https://images.unsplash.com/photo-1615480326253-3a483351cfa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMGp1aWNlJTIwZ2xhc3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3OTk1MTY4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Watermelon Mint Cooler",
      description: "Fresh watermelon juice with mint and lime",
      price: "₹280",
      image: "https://images.unsplash.com/photo-1596463989140-3b600dab72e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb2xkJTIwZHJpbmtzJTIwYmV2ZXJhZ2VzJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3Nzk5NTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Tropical Smoothie",
      description: "Mango, pineapple, coconut milk blend",
      price: "₹320",
      image: "https://images.unsplash.com/photo-1564844536306-2dca5256d9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2xkJTIwZHJpbmtzJTIwYmV2ZXJhZ2VzJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3Nzk5NTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Green Detox Juice",
      description: "Kale, spinach, cucumber, apple, ginger",
      price: "₹300",
      image: "https://images.unsplash.com/photo-1537185526994-a8714f82d3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmcmVzaCUyMGp1aWNlJTIwZ2xhc3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3OTk1MTY4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Fresh Lemonade",
      description: "Classic lemonade with a hint of mint",
      price: "₹220",
      image: "https://images.unsplash.com/photo-1526746687473-593f256d8b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb2xkJTIwZHJpbmtzJTIwYmV2ZXJhZ2VzJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3Nzk5NTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Iced Coffee",
      description: "Cold brew coffee with ice, milk optional",
      price: "₹280",
      image: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwZHJpbmtzJTIwYmV2ZXJhZ2VzJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3Nzk5NTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
  ]
};

const images = {
  header: "https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZW5kJTIwZ291cm1ldCUyMGRpc2h8ZW58MXx8fHwxNzc5Njk0MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const MenuItemCard = ({ item, id }: { item: { name: string, description: string, price: string, image: string }, id: string }) => {
  const { addItem } = useCart();

  const handleOrder = () => {
    const priceValue = parseFloat(item.price.replace('₹', '').replace(',', ''));
    addItem({
      id,
      name: item.name,
      description: item.description,
      price: priceValue,
      image: item.image
    });
    toast.success(`Added ${item.name} to cart!`, {
      style: { background: '#151515', color: '#fff', border: '1px solid #FF6B00' }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-6 bg-[#151515] border border-[#333] rounded-sm p-4 group hover:border-[#FF6B00]/50 transition-colors"
    >
      <div className="w-full sm:w-48 h-48 sm:h-36 flex-shrink-0 overflow-hidden rounded-sm">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="text-xl font-['Playfair_Display',serif] text-white font-medium group-hover:text-[#FF6B00] transition-colors leading-tight">
              {item.name}
            </h3>
            <span className="text-[#FF6B00] font-semibold text-lg whitespace-nowrap">{item.price}</span>
          </div>
          <p className="text-[#BDBDBD] text-sm font-light leading-relaxed mb-4">{item.description}</p>
        </div>
        
        <div className="mt-auto flex justify-end">
          <button 
            onClick={handleOrder}
            className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E56000] text-white px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors rounded-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export function Menu() {
  return (
    <div className="flex flex-col w-full bg-[#0F0F0F] text-white pb-24">
      {/* Page Header */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center border-b border-[#333]">
        <div className="absolute inset-0 z-0">
          <img
            src={images.header}
            alt="High-end gourmet ingredients"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0F0F0F]/60" />
        </div>
        <div className="relative z-10 text-center mt-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-[#FF6B00]" />
            <span className="text-[#FF6B00] uppercase tracking-[0.3em] text-xs font-semibold">Tasting Menu</span>
            <div className="h-[1px] w-8 bg-[#FF6B00]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display',serif] text-white mb-4"
          >
            Our Offerings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#BDBDBD] max-w-lg mx-auto font-light text-sm md:text-base"
          >
            Experience our curated selection of classic dishes, available for immediate order.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-4xl mt-16">
        {/* Starters */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] text-white mb-4">Première</h2>
            <div className="h-px w-16 bg-[#FF6B00] mx-auto" />
          </div>
          <div className="flex flex-col gap-6">
            {menuItems.starters.map((item, i) => (
              <MenuItemCard key={i} item={item} id={`starter-${i}`} />
            ))}
          </div>
        </div>

        {/* Mains */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] text-white mb-4">Plat Principal</h2>
            <div className="h-px w-16 bg-[#FF6B00] mx-auto" />
          </div>
          <div className="flex flex-col gap-6">
            {menuItems.mains.map((item, i) => (
              <MenuItemCard key={i} item={item} id={`main-${i}`} />
            ))}
          </div>
        </div>

        {/* Desserts */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] text-white mb-4">Desserts</h2>
            <div className="h-px w-16 bg-[#FF6B00] mx-auto" />
          </div>
          <div className="flex flex-col gap-6">
            {menuItems.desserts.map((item, i) => (
              <MenuItemCard key={i} item={item} id={`dessert-${i}`} />
            ))}
          </div>
        </div>

        {/* Beverages */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] text-white mb-4">Beverages</h2>
            <div className="h-px w-16 bg-[#FF6B00] mx-auto" />
          </div>
          <div className="flex flex-col gap-6">
            {menuItems.beverages.map((item, i) => (
              <MenuItemCard key={i} item={item} id={`beverage-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
