import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import LanguageSwitch from "../ui/LanguageSwitch";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const scrollToContact = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const contactSection = document.querySelector("#contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Define menu items without the Contact link
  const menuItems = [
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.products"), path: "/products" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-50 shadow-sm z-50">
      <nav className="container mx-auto px-6 md:px-10 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-10 w-auto transition-transform hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Render regular menu items */}
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-bold text-[#233054] tracking-wide hover:text-[#2b4796]"
              >
                {item.label}
              </Link>
            ))}

            {/* Contact link */}
            <Link
              to="/"
              onClick={scrollToContact}
              className="font-bold text-[#233054] tracking-wide hover:text-[#2b4796]"
            >
              {t("nav.contact")}
            </Link>

            {/* Language Switch button immediately after Contact */}
            <LanguageSwitch />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* Language Switch button immediately after Contact */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {/* ... other menu items ... */}
              <LanguageSwitch /> {/* Now only appears when menu is open */}
            </div>
          </div>
        )}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {/* Render regular menu items */}
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-[#2b4796] font-medium"
                >
                  {item.label}
                </Link>
              ))}

              {/* Contact link - Fixed by combining both onClick handlers */}
              <Link
                to="/"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  scrollToContact(e);
                }}
                className="text-gray-600 hover:text-[#2b4796] font-medium"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}