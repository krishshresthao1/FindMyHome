import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div
        className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-1
        gap-12
        px-6
        py-20
        md:grid-cols-2
        lg:grid-cols-4
      "
      >
        {/* Brand */}

        <div>
          <h2 className="text-3xl font-extrabold text-white">FindMyHome</h2>

          <p className="mt-5 leading-7">
            Making property search easier by connecting people with verified
            rental homes across Nepal.
          </p>

          <div className="mt-8 flex gap-5">
            <FaFacebookF
              className="cursor-pointer transition hover:text-white"
              size={20}
            />

            <FaInstagram
              className="cursor-pointer transition hover:text-white"
              size={20}
            />

            <FaLinkedinIn
              className="cursor-pointer transition hover:text-white"
              size={20}
            />
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>

          <ul className="space-y-4">
            <li>
              <Link className="transition hover:text-white" to="/home">
                Home
              </Link>
            </li>

            <li>
              <Link className="transition hover:text-white" to="/search">
                Browse Properties
              </Link>
            </li>

            <li>
              <Link className="transition hover:text-white" to="/saved">
                Saved Homes
              </Link>
            </li>

            <li>
              <Link className="transition hover:text-white" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}

        <div>
          <h3 className="mb-6 text-lg font-semibold text-white">Explore</h3>

          <ul className="space-y-4">
            <li>
              <Link
                to="/properties?type=apartment"
                className="transition hover:text-white"
              >
                Apartments
              </Link>
            </li>

            <li>
              <Link
                to="/properties?type=house"
                className="transition hover:text-white"
              >
                Houses
              </Link>
            </li>

            <li>
              <Link
                to="/properties?type=room"
                className="transition hover:text-white"
              >
                Rooms
              </Link>
            </li>

            <li>
              <Link
                to="/properties?type=commercial"
                className="transition hover:text-white"
              >
                Commercial
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-400" />

              <span>Nepal</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} className="text-blue-400" />

              <span>+977 98XXXXXXXX</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-blue-400" />

              <span>support@findmyhome.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">
        <div
          className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-3
          px-6
          py-6
          text-sm
          md:flex-row
          md:items-center
          md:justify-between
        "
        >
          <p>© 2026 FindMyHome. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
