
import { 
  Heart, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="py-16 bg-hotel-gray">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">Stay in the know</h3>
          <p className="text-lg text-gray-700 font-light max-w-2xl mx-auto mb-8">
            Sign up to our newsletter for the latest news, offers and travel inspiration
          </p>
          <div className="flex flex-col md:flex-row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
            />
            <button className="bg-black text-white px-8 py-3 rounded-none hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide text-sm font-light">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl md:text-3xl font-serif tracking-wider text-black font-semibold mb-2">
                MR<span className="inline-block mx-1 transform rotate-12">&</span>MRS SMITH
              </h1>
            </Link>
            <p className="text-sm text-gray-600">The travel club for hotel lovers</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-10">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">About us</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Careers</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Press</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Travel</h4>
              <ul className="space-y-2">
                <li><Link to="/hotels" className="text-sm text-gray-600 hover:text-black transition-colors">Hotels</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Villas</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Destinations</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Gift vouchers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Help center</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">FAQs</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Terms & conditions</Link></li>
                <li><Link to="#" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-black transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-black transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-black transition-colors">
                  <Twitter size={16} />
                </a>
              </div>
              <div className="space-y-2">
                <a href="tel:+1234567890" className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
                  <Phone size={14} className="mr-2" /> +1 (234) 567-890
                </a>
                <a href="mailto:contact@mrandmrssmith.com" className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
                  <Mail size={14} className="mr-2" /> contact@mrandmrssmith.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {currentYear} Mr & Mrs Smith. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Cookie policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Accessibility</a>
              <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
