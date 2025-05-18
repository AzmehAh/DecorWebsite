import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronDown,
  Shield,
  Droplet,
  Clock,
  Ruler,
  AlertTriangle,
  Loader2,
  Beaker,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { getLocalizedField } from "../lib/supabase";
import { useLanguage } from "../contexts/LanguageContext";
import type { Database } from "../types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface Section {
  id: string;
  titleKey: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: "details", titleKey: "productDetails.productdetailssectionname", icon: Shield },
  {
    id: "specifications",
    titleKey: "productDetails.technicalInfo.title",
    icon: Ruler,
  },
  {
    id: "application",
    titleKey: "productDetails.applicationMethod",
    icon: Beaker,
  },
  {
    id: "environmental",
    titleKey: "productDetails.storage.title",
    icon: Droplet,
  },
  { id: "storage", titleKey: "productDetails.storage.conditions", icon: Clock },
];

export default function ProductDetailsNew() {
  const { t, language } = useLanguage();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {}));

  useEffect(() => {
    fetchProduct();
    return () => {
      // Cleanup function to help prevent memory leaks
      setProduct(null);
      setSelectedPackages([]);
    };
  }, [id, language]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          brand:brands(id, name),
          product_packages(
            package:packages(*)
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        const packageIds =
          data.product_packages?.map((pp) => pp.package.id) || [];
        // Transform data based on language
        const transformedData = {
          ...data,
          name: language === "ar" && data.name_ar ? data.name_ar : data.name,
          description:
            language === "ar" && data.description_ar
              ? data.description_ar
              : data.description,
          features:
            language === "ar" && data.features_ar
              ? data.features_ar
              : data.features,
          method_of_application:
            language === "ar" && data.method_of_application_ar
              ? data.method_of_application_ar
              : data.method_of_application,
          mixing:
            language === "ar" && data.mixing_ar ? data.mixing_ar : data.mixing,
          thinner:
            language === "ar" && data.thinner_ar
              ? data.thinner_ar
              : data.thinner,
          application_temperatures:
            language === "ar" && data.application_temperatures_ar
              ? data.application_temperatures_ar
              : data.application_temperatures,
          application_note:
            language === "ar" && data.application_note_ar
              ? data.application_note_ar
              : data.application_note,
          surface_preparation:
            language === "ar" && data.surface_preparation_ar
              ? data.surface_preparation_ar
              : data.surface_preparation,
          storing_conditions:
            language === "ar" && data.storing_conditions_ar
              ? data.storing_conditions_ar
              : data.storing_conditions,
          notice:
            language === "ar" && data.notice_ar ? data.notice_ar : data.notice,
          note: language === "ar" && data.note_ar ? data.note_ar : data.note,
          flexibility:
            language === "ar" && data.flexibility_ar
              ? data.flexibility_ar
              : data.flexibility,
          washability:
            language === "ar" && data.washability_ar
              ? data.washability_ar
              : data.washability,
          adhesion:
            language === "ar" && data.adhesion_ar
              ? data.adhesion_ar
              : data.adhesion,
          color:
            language === "ar" && data.color_ar ? data.color_ar : data.color,
          gloss:
            language === "ar" && data.gloss_ar ? data.gloss_ar : data.gloss,
          volume_solids:
            language === "ar" && data.volume_solids_ar
              ? data.volume_solids_ar
              : data.volume_solids,
          voc: language === "ar" && data.voc_ar ? data.voc_ar : data.voc,
          abrasion_resistance:
            language === "ar" && data.abrasion_resistance_ar
              ? data.abrasion_resistance_ar
              : data.abrasion_resistance,
          recommended_film_thickness:
            language === "ar" && data.recommended_film_thickness_ar
              ? data.recommended_film_thickness_ar
              : data.recommended_film_thickness,
          water_resistance:
            language === "ar" && data.water_resistance_ar
              ? data.water_resistance_ar
              : data.water_resistance,
          specific_gravity:
            language === "ar" && data.specific_gravity_ar
              ? data.specific_gravity_ar
              : data.specific_gravity,
          number_of_coats:
            language === "ar" && data.number_of_coats_ar
              ? data.number_of_coats_ar
              : data.number_of_coats,
          theoretical_spreading_rate:
            language === "ar" && data.theoretical_spreading_rate_ar
              ? data.theoretical_spreading_rate_ar
              : data.theoretical_spreading_rate,
          dry_to_touch:
            language === "ar" && data.dry_to_touch_ar
              ? data.dry_to_touch_ar
              : data.dry_to_touch,
          dry_to_handle:
            language === "ar" && data.dry_to_handle_ar
              ? data.dry_to_handle_ar
              : data.dry_to_handle,
          dry_to_topcoat:
            language === "ar" && data.dry_to_topcoat_ar
              ? data.dry_to_topcoat_ar
              : data.dry_to_topcoat,
          complete_setting:
            language === "ar" && data.complete_setting_ar
              ? data.complete_setting_ar
              : data.complete_setting,
          recommended_uses:
            language === "ar" && data.recommended_uses_ar
              ? data.recommended_uses_ar
              : data.recommended_uses,

          brand: {
            ...data.brand,
            name:
              language === "ar" && data.brand?.name_ar
                ? data.brand.name_ar
                : data.brand?.name,
          },
        };
        setProduct(transformedData);
        setSelectedPackages(packageIds);
      }
    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-[#2b4796] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t("common.error")}
          </h1>
          <p className="text-gray-600 mb-6">{error || t("common.noResults")}</p>
          <Link
            to="/products"
            className="inline-flex items-center text-[#2b4796] hover:text-[#233054] font-medium"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            {t("common.backToProducts")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-50 max-w-6xl mx-auto">
        <div className="container border-b mx-auto px-4 py-8 pt-24">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#2b4796] rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              {t("common.backToProducts")}
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <div className="max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={
                    product.image_url ||
                    "https://ueaiiwmblxyqsflvnzir.supabase.co/storage/v1/object/public/image//decore4.jfif"
                  }
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/*{product.brand && (
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  {product.brand.logo && (
      <img src={product.brand.logo} alt={product.brand.name} className="h-5 w-5" />
    )}
                  <span className="font-medium">
                    {typeof product.brand === 'object' ? product.brand.name : product.brand}
                  </span>
                </div>
              )}*/}
              <h1 className="text-3xl font-bold tex-[#233054] mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/*<div className="mb-6">
                <span className="text-xl font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>*/}

              {product.product_packages &&
                product.product_packages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {t("productDetails.availableSizes")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.product_packages.map((pp) => (
                        <span
                          key={pp.package.id}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {pp.package.size_name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {sections.map((section) => (
            <div key={section.id} className="mb-4">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between bg-white p-4 shadow-sm hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-[#2b4796]" />
                  <span className="font-medium text-gray-900">
                    {t(section.titleKey)}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedSections[section.id] ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedSections[section.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white  p-4  shadow-sm">
                      {section.id === "details" && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            {product.color && (
                              <div>
                                <span className="font-medium">
                                  {t("productDetails.color")}:
                                </span>
                                <span className="text-gray-600">
                                  {" "}
                                  {product.color}{" "}
                                </span>
                              </div>
                            )}
                            {product.gloss && (
                              <div>
                                <span className="font-medium">
                                  {t("productDetails.gloss")}:
                                </span>{" "}
                                <span className="text-gray-600">
                                  {" "}
                                  {product.gloss}{" "}
                                </span>
                              </div>
                            )}
                          </div>
                          {product.recommended_uses && (
                            <div>
                              <span className="font-medium">
                                {t(
                                  "productDetails.technicalInfo.recommendedUses",
                                )}
                                :
                              </span>
                              <span className="text-gray-600">
                                {" "}
                                {product.recommended_uses}{" "}
                              </span>
                            </div>
                          )}

                          {product.features && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.features")}:
                              </h4>
                              <div className="text-gray-600 whitespace-pre-line">
                                {product.features
                                  .split("\n")
                                  .map((line, index) => (
                                    <p key={index} className="mb-0">
                                      {line}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {section.id === "specifications" && (
                        <div className="grid md:grid-cols-2 gap-4">
                          {product.volume_solids && (
                            <div>
                              <span className="font-medium">
                                {t("productDetails.technicalInfo.volumeSolids")}
                                :
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.volume_solids}{" "}
                              </span>
                            </div>
                          )}
                          {product.voc && (
                            <div>
                              <span className="font-medium">
                                {t("productDetails.technicalInfo.voc")}:
                              </span>
                              <span className="text-gray-600">
                                {" "}
                                {product.voc}
                              </span>
                            </div>
                          )}
                          {product.theoretical_spreading_rate && (
                            <div>
                              <span className="font-medium">
                                {t(
                                  "productDetails.technicalInfo.spreadingRate",
                                )}
                                :
                              </span>{" "}
                              <span className="text-gray-600">
                                {product.theoretical_spreading_rate} m²/L
                              </span>
                            </div>
                          )}
                          {product.number_of_coats && (
                            <div>
                              <span className="font-medium">
                                {t(
                                  "productDetails.technicalInfo.numberOfCoats",
                                )}
                                :
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.number_of_coats} m²/L
                              </span>
                            </div>
                          )}
                          {product.flexibility && (
                            <div>
                              <span className="font-medium">
                                {t("productDetails.technicalInfo.flexibility")}:
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.flexibility} m²/L{" "}
                              </span>
                            </div>
                          )}
                          {product.adhesion && (
                            <div>
                              <span className="font-medium">
                                {t("productDetails.technicalInfo.adhesion")}:
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.adhesion} m²/L{" "}
                              </span>
                            </div>
                          )}
                          {product.washability && (
                            <div>
                              <span className="font-medium">
                                {t("productDetails.technicalInfo.washability")}:
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.washability}{" "}
                              </span>
                            </div>
                          )}
                          {product.abrasion_resistance && (
                            <div>
                              <span className="font-medium">
                                {t(
                                  "productDetails.technicalInfo.abrasionResistance",
                                )}
                                :
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.abrasion_resistance}{" "}
                              </span>
                            </div>
                          )}

                          {product.recommended_film_thickness && (
                            <div>
                              <span className="font-medium">
                                {t(
                                  "productDetails.technicalInfo.filmThickness",
                                )}
                                :
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.recommended_film_thickness} m²/L{" "}
                              </span>
                            </div>
                          )}
                          {product.specific_gravity && (
                            <div>
                              <span className="font-medium">
                                {t(
                                  "productDetails.technicalInfo.specificGravity",
                                )}
                                :
                              </span>{" "}
                              <span className="text-gray-600">
                                {" "}
                                {product.specific_gravity} m²/L{" "}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {section.id === "application" && (
                        <div className="space-y-4">
                          {product.method_of_application && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.applicationMethod")}
                              </h4>
                              <p className="text-gray-600">
                                {product.method_of_application}
                              </p>
                            </div>
                          )}
                          {product.application_temperatures && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.applicationTemperatures")}
                              </h4>
                              <p className="text-gray-600">
                                {product.application_temperatures}
                              </p>
                            </div>
                          )}
                          {product.application_note && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.applicationNote")}
                              </h4>
                              <p className="text-gray-600">
                                {product.application_note}
                              </p>
                            </div>
                          )}
                          {product.mixing && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.mixingInstructions")}
                              </h4>
                              <p className="text-gray-600">{product.mixing}</p>
                            </div>
                          )}
                          {product.thinner && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.thinner")}
                              </h4>
                              <p className="text-gray-600">{product.thinner}</p>
                            </div>
                          )}
                          {product.surface_preparation && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.surfacePreparation")}
                              </h4>
                              <p className="text-gray-600">
                                {product.surface_preparation}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {section.id === "environmental" && (
                        <div className="space-y-4">
                          {product.water_resistance && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t(
                                  "productDetails.technicalInfo.waterResistance",
                                )}
                              </h4>
                              <p className="text-gray-600">
                                {product.water_resistance}
                              </p>
                            </div>
                          )}
                          {product.notice && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.storage.notice")}
                              </h4>
                              <p className="text-gray-600">{product.notice}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {section.id === "storage" && (
                        <div className="space-y-4">
                          {product.storing_conditions && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.storage.conditions")}
                              </h4>
                              <div className="text-gray-600 whitespace-pre-line">
                                {product.storing_conditions
                                  .split("\n")
                                  .map((line, index) => (
                                    <p key={index} className="mb-0">
                                      {line}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          )}
                          {product.dry_to_touch && (
                            <div>
                              <h4 className="font-medium mb-1">
                                {t("productDetails.dryingTime.title")}
                              </h4>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <span className="font-medium">
                                    {t("productDetails.dryingTime.touch")}{": "}
                                  </span>
                                  <span className="text-gray-600">
                                    {product.dry_to_touch}
                                  </span>
                                </div>
                                {product.dry_to_handle && (
                                  <div>
                                    <span className="font-medium">
                                      {t("productDetails.dryingTime.handle")}{": "}
                                    </span>
                                    <span className="text-gray-600">
                                      {product.dry_to_handle}
                                    </span>
                                  </div>
                                )}
                                {product.dry_to_topcoat && (
                                  <div>
                                    <span className="font-medium">
                                      {t("productDetails.dryingTime.topcoat")}
                                      {": "}
                                    </span>
                                    <span className="text-gray-600">
                                      {product.dry_to_topcoat}
                                    </span>
                                  </div>
                                )}
                                {product.complete_setting && (
                                  <div>
                                    <span className="font-medium">
                                      {t("productDetails.dryingTime.complete")}
                                      {": "}
                                    </span>
                                    <span className="text-gray-600">
                                      {product.complete_setting}
                                    </span>
                                  </div>
                                )}
                                {product.note && (
                                  <div>
                                    <span className="font-medium">
                                      {t("productDetails.note")}
                                      {": "}
                                    </span>
                                    <span className="text-gray-600">
                                      {" "}
                                      {product.note}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
