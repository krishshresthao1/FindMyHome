import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-12 px-6 py-20">
        {/* Brand */}

        <div>
          <h2 className="text-3xl font-extrabold text-white">FindMyHome</h2>

          <p className="mt-5 leading-7">
            Helping people discover verified rental properties across Kathmandu
            Valley.
          </p>

          <div className="mt-8 flex gap-5">
            <FaFacebookF className="cursor-pointer transition hover:text-white" />

            <FaInstagram className="cursor-pointer transition hover:text-white" />

            <FaLinkedinIn className="cursor-pointer transition hover:text-white" />
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">Quick Links</h3>

          <ul className="space-y-4">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/search">Browse</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Property */}

        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">Property</h3>

          <ul className="space-y-4">
            <li>Rooms</li>

            <li>Flats</li>

            <li>Houses</li>

            <li>Commercial</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">Contact</h3>

          <div className="space-y-5">
            <div className="flex gap-3">
              <MapPin />

              <span>Kathmandu, Nepal</span>
            </div>

            <div className="flex gap-3">
              <Phone />

              <span>+977 98XXXXXXXX</span>
            </div>

            <div className="flex gap-3">
              <Mail />

              <span>info@rentnepal.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <p className="text-sm">© 2026 RentNepal. All rights reserved.</p>

          <p className="text-sm">Built with ❤️ in Nepal.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
