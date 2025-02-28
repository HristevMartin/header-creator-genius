
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  { label: "Hotels", path: "/hotels" },
  { label: "Villas", path: "/villas" },
  { label: "Offers", path: "/offers" },
  { label: "Honeymoons", path: "/honeymoons" },
  { label: "Inspiration", path: "/inspiration" },
  { label: "Destinations", path: "/destinations" },
  { label: "Family", path: "/family" },
  { label: "Editorial", path: "/editorial" },
  { label: "Gift shop", path: "/gift-shop" },
];

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <ul className="flex justify-center space-x-2 md:space-x-4 lg:space-x-8 overflow-x-auto no-scrollbar">
          {menuItems.map((item) => (
            <li key={item.label} className="relative py-4">
              <Link
                to={item.path}
                className="text-gray-800 hover:text-black whitespace-nowrap text-sm md:text-base font-medium px-1"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
                {hoveredItem === item.label && (
                  <motion.div
                    className="absolute bottom-2 left-0 right-0 h-0.5 bg-black"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
