import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import Logo from "../ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#233054] text-base text-white leading-relaxed font-light">
      <div className="container mx-auto px-20 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* About Us */}
          <div className="md:col-span-3">
            <Link to="/" className="inline-block mb-6">
              <Logo className="h-16 w-auto" color="#ffffff" />
            </Link>
            <p className="text-base text-white leading-relaxed font-light mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1BRS8Aucho/"
                className="text-base text-white leading-relaxed font-light hover:fill-[#4267B2] rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 hover:fill-[#4267B2]" />
              </a>

              <a
                href="https://www.instagram.com/decorpaintsofficial?igsh=b3VjMGJucGJqeHdk"
                className="group text-base text-white leading-relaxed font-light transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* رمز Instagram */}
                <Instagram className="h-5 w-5 transition-colors group-hover:fill-[url(#instagram-gradient)]" />

                {/* تعريف التدرج اللوني */}
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <linearGradient
                      id="instagram-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#F4C41D" />
                      <stop offset="50%" stopColor="#E1306C" />
                      <stop offset="100%" stopColor="#405DE6" />
                    </linearGradient>
                  </defs>
                </svg>
              </a>
              <a
                href="https://wa.me/message/VWCKRVH3KTNEO1"
                className="text-base text-white leading-relaxed font-light hover:fill-[#25D366] rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 hover:fill-[#25D366]" />
              </a>
            </div>
          </div>

          {/* Important Pages */}
          <div className="md:col-span-3">
            <h3 className="text-white text-base font-medium mb-6">
              {t("footer.importantPages")}
            </h3>
            <div className="space-y-4">
              <Link
                to="/products"
                className="flex items-center group text-base text-white leading-relaxed font-light hover:text-white transition-colors"
              >
                <span>{t("nav.products")}</span>
                <ArrowUpRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                to="/"
                className="flex items-center group text-white-400 hover:text-white"
              >
                <span>{t("nav.contact")}</span>
                <ArrowUpRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="flex items-center group text-white-400 hover:text-white"
              >
                <span>{t("nav.about")}</span>
                <ArrowUpRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3">
            <h3 className="text-white text-base font-medium mb-6">
              {t("footer.contact")}
            </h3>
            <div className="space-y-4 break-words">
              <a
                href="tel:+1234567890"
                className="flex items-center text-white-400 hover:text-white group"
              >
                <Phone className="h-5 w-5 mr-2" />
                <span className="group-hover:text-white">
                  {t("footer.phone")}
                </span>
              </a>
              <a
                href="mailto:info@decorpaint.com"
                className="flex items-center text-white-400 hover:text-white group"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span className="break-all group-hover:text-white">
                  {t("footer.email")}
                </span>
              </a>
              <div className="flex items-start text-white-400">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <div className="flex-1">
                  {t("footer.address")}
                  <br />
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="md:col-span-3">
            <h3 className="text-white text-base font-medium mb-6">
              {t("footer.businessHours")}
            </h3>
            <div className="space-y-3">
              <p className="text-white">{t("footer.workingDays")}</p>
              <p className="text-white">{t("footer.weekend")}</p>
            </div>
          </div>
        </div>

        {/* Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-center items-center text-sm text-white">
          <p className="text-white">
            © {currentYear} {t("footer.copyright")}
          </p>
          {/* <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>*/}
        </div>
      </div>
    </footer>
  );
}
