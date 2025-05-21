import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs
      .send(
        "service_djnnl1c",
        "template_lams4je",     
        templateParams,
        "6U867S8Fp0svP3LJg"       
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert(t("contact.successMessage")); 
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          alert(t("contact.errorMessage")); 
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact-section" className="py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2b4796] mb-6">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t("contact.subtitle")}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t("contact.namePlaceholder")}
                />

                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t("contact.emailPlaceholder")}
                />

                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 mt-4">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("contact.phonePlaceholder")}
                />

                <label htmlFor="message" className="block text-gray-700 font-medium mb-2 mt-4">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full bg-[#233054] text-white font-medium px-8 py-4 rounded-lg hover:bg-[#2b4796] transition-all group"
              >
                <span>{t("contact.submit")}</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}