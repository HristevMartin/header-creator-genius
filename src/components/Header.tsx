
import { useState, useEffect } from "react";
import { Heart, Phone, ShoppingBag, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white",
      scrolled ? "shadow-sm" : "border-b border-gray-200"
    )}>
      {/* Top bar with logo and icons */}
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Left side - Tagline */}
        <div className="hidden md:block">
          <p className="text-sm font-serif text-gray-800">The travel club for hotel lovers</p>
        </div>

        {/* Mobile menu icon - visible on small screens */}
        <div className="flex md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <Menu size={24} />
          </button>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/d2099c62-f5cd-4228-8772-115aa7cb85f0.png" 
              alt="Mr & Mrs Smith" 
              className="h-8 md:h-10"
              style={{ display: "none" }} // Hide the actual image since we're using text as logo
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-serif tracking-wider text-black font-semibold">
              MR<span className="inline-block mx-1 transform rotate-12">&</span>MRS SMITH
            </h1>
          </Link>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="text-gray-800 hover:text-gray-600 transition-colors">
            <Phone size={20} />
          </button>
          <button className="text-gray-800 hover:text-gray-600 transition-colors">
            <Heart size={20} />
          </button>
          <button className="text-gray-800 hover:text-gray-600 transition-colors">
            <ShoppingBag size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
};

export default Header;
