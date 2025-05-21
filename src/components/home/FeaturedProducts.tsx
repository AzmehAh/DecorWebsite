import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchProducts } from "../../lib/productUtils";
import { useLanguage } from "../../contexts/LanguageContext";
import type { Database } from "../../types/supabase";
import { supabase } from "../../lib/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function FeaturedProducts() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [language]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      setProducts(data || []);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching featured products:", err);
      setError(t("common.error"));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-8 ">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-[#2b4796] mb-4">
            {t("products.featured.subtitle")}
          </p>
          <h2 className="text-4xl font-bold text-[#233054] mb-6">
            {t("products.featured.title")}
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl font-light">
            {t("products.featured.description")}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#233054]">
            <span className="sr-only">{t("common.loading")}</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl rounded-bl-none shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={
                      product.image_url ||
                      "https://ueaiiwmblxyqsflvnzir.supabase.co/storage/v1/object/public/image//decore4.jfif"
                    }
                    alt={
                      language === "ar"
                        ? product.name_ar || product.name
                        : product.name
                    }
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col min-h-[200px]">
                  <h3 className="text-xl font-light text-[#2C2C2C] group-hover:text-[#233054] transition-colors line-clamp-2 mb-2">
                    {language === "ar"
                      ? product.name_ar || product.name
                      : product.name}
                  </h3>
                  <p className="text-[#4A4A4A] font-light mb-4 line-clamp-2 flex-1">
                    {language === "ar"
                      ? product.description_ar || product.description
                      : product.description}
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center text-[#233054] font-medium group-hover:translate-x-1 transition-transform"
                    >
                      {t("common.viewDetails")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-[#233054] text-white font-medium px-10 py-4 rounded-full hover:bg-[#1a2440] transition-all hover:scale-105"
            >
              {t("products.featured.viewAll")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </>
      ) : (
        <div className="col-span-4 text-center py-12">
          <p className="text-gray-600">{t("common.noResults")}</p>
        </div>
      )}
    </section>
  );
}