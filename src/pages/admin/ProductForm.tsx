import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  ArrowLeft,
  Languages,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  Package,
  Paintbrush,
  Beaker,
  Thermometer,
  Shield,
  Clock,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { updateProduct } from "../../lib/productUtils";
import type { Database } from "../../types/supabase";
import type { Brand } from "../../types";
import type { application_fields } from "../../types";
import type { surface_types } from "../../types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Package = Database["public"]["Tables"]["packages"]["Row"];

const initialProduct = {
  name: "",
  description: "",
  price: 0,
  name_ar: "",
  description_ar: "",
  image_url: "",
  brand_id: "",
  application_fields: "",
  application_fields_ar: "",
  recommended_uses: "",
  recommended_uses_ar: "",
  features: "",
  features_ar: "",
  method_of_application: "",
  method_of_application_ar: "",
  mixing: "",
  mixing_ar: "",
  thinner: "",
  thinner_ar: "",
  application_temperatures: "",
  application_temperatures_ar: "",
  application_note: "",
  application_note_ar: "",
  color: "",
  color_ar: "",
  gloss: "",
  gloss_ar: "",
  volume_solids: "",
  volume_solids_ar: "",
  voc: "",
  voc_ar: "",
  number_of_coats: "",
  number_of_coats_ar: "",
  theoretical_spreading_rate: 0,
  theoretical_spreading_rate_ar: 0,
  flexibility: "",
  flexibility_ar: "",
  adhesion_ar: "",
  adhesion: "",
  abrasion_resistance: "",
  abrasion_resistance_ar: "",
  washability: "",
  washability_ar: "",
  recommended_film_thickness: "",
  recommended_film_thickness_ar: "",
  specific_gravity: "",
  specific_gravity_ar: "",
  surface_types: "",
  surface_types_ar: "",
  water_resistance: "",
  water_resistance_ar: "",
  surface_preparation: "",
  surface_preparation_ar: "",
  dry_to_touch: "",
  dry_to_touch_ar: "",
  dry_to_handle: "",
  dry_to_handle_ar: "",
  complete_setting: "",
  complete_setting_ar: "",
  dry_to_topcoat: "",
  dry_to_topcoat_ar: "",

  note: "",
  note_ar: "",
  storing_conditions: "",
  storing_conditions_ar: "",
  notice: "",
  notice_ar: "",
};

const FormSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-blue-600" />
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  multiline = false,
  options = [],
  placeholder = "",
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  multiline?: boolean;
  options?: any[];
  placeholder?: string;
  dir?: string;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    {multiline ? (
      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
        dir={dir}
        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    ) : type === "select" ? (
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} {option.name_ar ? `(${option.name_ar})` : ""}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? "any" : undefined}
        placeholder={placeholder}
        dir={dir}
        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    )}
  </div>
);

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [product, setProduct] = useState<Partial<Product>>(initialProduct);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [surface_types, setsurface_types] = useState<surface_types[]>([]);
  const [applicationFields, setApplicationFields] = useState<
    application_fields[]
  >([]);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    if (isEditing && id) {
      fetchProduct();
    }
    fetchReferenceData();
  }, [id]);

  const fetchReferenceData = async () => {
    try {
      const [
        { data: brandsData },
        { data: applicationFieldsData },
        { data: surface_types_Data },
        { data: packagesData },
      ] = await Promise.all([
        supabase.from("brands").select("*").order("name"),
        supabase.from("application_fields").select("*").order("name"),
        supabase.from("surface_types").select("*").order("name"),
        supabase.from("packages").select("*").order("size_name"),
      ]);

      setBrands(brandsData || []);
      setsurface_types(surface_types_Data || []);
      setApplicationFields(applicationFieldsData || []);
      setPackages(packagesData || []);
    } catch (err) {
      console.error("Error fetching reference data:", err);
    }
  };

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
          product_packages (
            package_id
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        const { product_packages, ...productData } = data;
        setProduct(productData);
        setSelectedPackages(product_packages.map((pp) => pp.package_id));
      }
    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && id) {
        const result = await updateProduct(
          id,
          selectedPackages,
          { ...product, packages: selectedPackages },
          () => setSuccess("Product updated successfully"),
          () => setError("Failed to update product"),
        );

        if (!result.success) {
          setError(result.message);
        }
      } else {
        const { data: productData, error: productError } = await supabase
          .from("products")
          .insert([product])
          .select()
          .single();

        if (productError) throw productError;

        if (productData && selectedPackages.length > 0) {
          const packageLinks = selectedPackages.map((packageId) => ({
            product_id: productData.id,
            package_id: packageId,
          }));

          const { error: linkError } = await supabase
            .from("product_packages")
            .insert(packageLinks);

          if (linkError) throw linkError;
        }

        setSuccess("Product created successfully");
        setTimeout(() => navigate("/admin/products"), 1500);
      }
    } catch (err: any) {
      console.error("Error saving product:", err);
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: ["price", "theoretical_spreading_rate"].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }
 return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/products")}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Products
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Product" : "New Product"}
            </h1>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-red-50 p-4 rounded-md flex items-center text-red-700"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-green-50 p-4 rounded-md flex items-center text-green-700"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
         <FormSection title="Basic Information" icon={Paintbrush}>
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Name"
        name="name"
        value={product.name}
        onChange={handleChange}
      />
      <FormField
        label="الاسم"
        name="name_ar"
        value={product.name_ar}
        onChange={handleChange}
        dir="rtl"
        inputClassName="text-right"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Price"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
      />
    </div>

    {/* الوصف */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Description"
        name="description"
        value={product.description}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="الوصف"
        name="description_ar"
        value={product.description_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />
    </div>

    {/* المميزات */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Features"
        name="features"
        value={product.features}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="المميزات"
        name="features_ar"
        value={product.features_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />
    </div>

    <div>
      <FormField
        label="Image URL"
        name="image_url"
        value={product.image_url}
        onChange={handleChange}
      />
    </div>
  </div>
</FormSection>


          <FormSection title="Brand & Packaging" icon={Building2}>
            <FormField
              label="Brand"
              name="brand_id"
              type="select"
              value={product.brand_id}
              onChange={handleChange}
              required
              options={brands}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Packages
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {packages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPackages((prev) => [...prev, pkg.id]);
                        } else {
                          setSelectedPackages((prev) =>
                            prev.filter((id) => id !== pkg.id),
                          );
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Package className="h-4 w-4 text-gray-400 mx-2" />
                    <span className="text-sm text-gray-700">
                      {pkg.size_name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </FormSection>

          <FormSection title="Application Details" icon={Beaker}>
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <FormField
        label="Method of Application"
        name="method_of_application"
        value={product.method_of_application}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="أداة الاستخدام"
        name="method_of_application_ar"
        value={product.method_of_application_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />

      {/* Mixing Instructions */}
      <FormField
        label="Mixing Instructions"
        name="mixing"
        value={product.mixing}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="طريقة المزج"
        name="mixing_ar"
        value={product.mixing_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />

      {/* Thinner */}
      <FormField
        label="Thinner"
        name="thinner"
        value={product.thinner}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="المذيب / المنظف"
        name="thinner_ar"
        value={product.thinner_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />

      {/* Application Temperature */}
      <FormField
        label="Application Temperature"
        name="application_temperatures"
        value={product.application_temperatures}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="درجة الحرارة أثناء التنفيذ"
        name="application_temperatures_ar"
        value={product.application_temperatures_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />

      {/* Application Note */}
      <FormField
        label="Application Note"
        name="application_note"
        value={product.application_note}
        onChange={handleChange}
        multiline
      />
      <FormField
        label="ملاحظات التطبيق"
        name="application_note_ar"
        value={product.application_note_ar}
        onChange={handleChange}
        multiline
        dir="rtl"
        inputClassName="text-right"
      />
    </div>
  </div>
</FormSection>


         <FormSection title="Technical Specifications" icon={Shield}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Color */}
    <FormField
      label="Color"
      name="color"
      value={product.color}
      onChange={handleChange}
    />
    <FormField
      label="لون"
      name="color_ar"
      value={product.color_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Gloss */}
    <FormField
      label="Gloss"
      name="gloss"
      value={product.gloss}
      onChange={handleChange}
    />
    <FormField
      label="لمعان"
      name="gloss_ar"
      value={product.gloss_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Volume Solids */}
    <FormField
      label="Volume Solids"
      name="volume_solids"
      value={product.volume_solids}
      onChange={handleChange}
    />
    <FormField
      label="المحتوى من المواد الصلبة"
      name="volume_solids_ar"
      value={product.volume_solids_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* VOC */}
    <FormField
      label="VOC"
      name="voc"
      value={product.voc}
      onChange={handleChange}
    />
    <FormField
      label="المحتوى من المركبات العضوية المتطايرة"
      name="voc_ar"
      value={product.voc_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Number of Coats */}
    <FormField
      label="Number of Coats"
      name="number_of_coats"
      value={product.number_of_coats}
      onChange={handleChange}
    />
    <FormField
      label="عدد أوجه الطلاء"
      name="number_of_coats_ar"
      value={product.number_of_coats_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Water Resistance */}
    <FormField
      label="Water Resistance"
      name="water_resistance"
      value={product.water_resistance}
      onChange={handleChange}
    />
    <FormField
      label="مقاومة الماء"
      name="water_resistance_ar"
      value={product.water_resistance_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Flexibility */}
    <FormField
      label="Flexibility"
      name="flexibility"
      value={product.flexibility}
      onChange={handleChange}
    />
    <FormField
      label="المرونة"
      name="flexibility_ar"
      value={product.flexibility_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Adhesion */}
    <FormField
      label="Adhesion"
      name="adhesion"
      value={product.adhesion}
      onChange={handleChange}
    />
    <FormField
      label="شدة الالتصاق"
      name="adhesion_ar"
      value={product.adhesion_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Washability */}
    <FormField
      label="Washability"
      name="washability"
      value={product.washability}
      onChange={handleChange}
    />
    <FormField
      label="قابلية الغسل"
      name="washability_ar"
      value={product.washability_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Abrasion Resistance */}
    <FormField
      label="Abrasion Resistance"
      name="abrasion_resistance"
      value={product.abrasion_resistance}
      onChange={handleChange}
    />
    <FormField
      label="مقاومة التآكل"
      name="abrasion_resistance_ar"
      value={product.abrasion_resistance_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Recommended Film Thickness */}
    <FormField
      label="Recommended Film Thickness"
      name="recommended_film_thickness"
      value={product.recommended_film_thickness}
      onChange={handleChange}
    />
    <FormField
      label="سماكة الفيلم المقترحة"
      name="recommended_film_thickness_ar"
      value={product.recommended_film_thickness_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Theoretical Spreading Rate */}
    <FormField
      label="Theoretical Spreading Rate"
      name="theoretical_spreading_rate"
      type="number"
      value={product.theoretical_spreading_rate}
      onChange={handleChange}
    />
    <FormField
      label="معدل التغطية النظري"
      name="theoretical_spreading_rate_ar"
      type="number"
      value={product.theoretical_spreading_rate_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Specific Gravity */}
    <FormField
      label="Specific Gravity"
      name="specific_gravity"
      value={product.specific_gravity}
      onChange={handleChange}
    />
    <FormField
      label="الكثافة بعد المزج"
      name="specific_gravity_ar"
      value={product.specific_gravity_ar}
      onChange={handleChange}
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Surface Preparation */}
    <FormField
      label="Surface Preparation"
      name="surface_preparation"
      value={product.surface_preparation}
      onChange={handleChange}
      multiline
    />
    <FormField
      label="تحضير السطح"
      name="surface_preparation_ar"
      value={product.surface_preparation_ar}
      onChange={handleChange}
      multiline
      dir="rtl"
      inputClassName="text-right"
    />

    {/* Application Fields */}
    <FormField
      label="Application Fields"
      name="application_fields"
      type="select"
      value={product.application_fields}
      onChange={handleChange}
      required
      options={applicationFields}
    />
    <div /> {/* Placeholder to keep grid alignment */}

    {/* Surface Types */}
    <FormField
      label="Surface Types"
      name="surface_types"
      type="select"
      value={product.surface_types}
      onChange={handleChange}
      required
      options={surface_types}
    />
    <div /> {/* Placeholder to keep grid alignment */}
  </div>
</FormSection>


          <FormSection title="Storage & Safety" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Dry to Touch"
                      name="dry_to_touch"
                      value={product.dry_to_touch}
                      onChange={handleChange}
                    />
                     <FormField
                      label="Dry to Touch (  الجفاف الأولي )"
                      name="dry_to_touch_ar"
                      value={product.dry_to_touch_ar}
                      onChange={handleChange}
                      dir="rtl"
                    />
                    <FormField
                      label="Dry to Handle"
                      name="dry_to_handle"
                      value={product.dry_to_handle}
                      onChange={handleChange}
                    />
                     <FormField
                      label="Dry to Handle ( الجفاف النهائي)"
                      name="dry_to_handle_ar"
                      value={product.dry_to_handle_ar}
                      onChange={handleChange}
                      dir="rtl"
                    />
                    <FormField
                      label="Dry to Topcoat"
                      name="dry_to_topcoat"
                      value={product.dry_to_topcoat}
                      onChange={handleChange}
                    />
                    <FormField
                      label="Dry to Topcoat (زمن الجفاف قبل طلاء وجه ناهي)"
                      name="dry_to_topcoat_ar"
                      value={product.dry_to_topcoat_ar}
                      onChange={handleChange}
                      dir="rtl"
                    />
                    <FormField
                      label="Complete Setting"
                      name="complete_setting"
                      value={product.complete_setting}
                      onChange={handleChange}
                    />
                      <FormField
                      label="Complete Setting (التصلب التام )"
                      name="complete_setting_ar"
                      value={product.complete_setting_ar}
                      onChange={handleChange}
                      dir="rtl"
                    />
                    <FormField
                      label="Note"
                      name="note"
                      value={product.note}
                      onChange={handleChange}
                      multiline
                      rows={4}
                    />
                     <FormField
                      label="Note (ملاحظة)"
                      name="note_ar"
                      value={product.note_ar}
                      onChange={handleChange}
                      dir="rtl"
                      multiline
                     rows={4}
                    />
                  </div>
                  <FormField
                    label="Storage Conditions"
                    name="storing_conditions"
                    value={product.storing_conditions}
                    onChange={handleChange}
                    multiline
                  />
                  <FormField
                    label="Storage Conditions (ظروف التخزين)"
                    name="storing_conditions_ar"
                    value={product.storing_conditions_ar}
                    onChange={handleChange}
                    multiline
                    dir="rtl"
                  />
                  <FormField
                    label="recommended_uses"
                    name="recommended_uses"
                    multiline
                    value={product.recommended_uses}
                    onChange={handleChange}
                  />
                  <FormField
                    label="recommended_uses (نصائح للاستخدام)"
                    name="recommended_uses_ar"
                    multiline
                    value={product.recommended_uses_ar}
                    onChange={handleChange}
                    dir="rtl"
                  />

                  <FormField
                    label="Notice"
                    name="notice"
                    value={product.notice}
                    onChange={handleChange}
                    multiline
                  />
                   <FormField
                    label="Notice (ملاحظات)"
                    name="notice_ar"
                    value={product.notice_ar}
                    onChange={handleChange}
                    multiline
                    dir="rtl"
                  />
                   <div />
          </FormSection>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <div className="flex items-center">
                <Save className="h-5 w-5 mr-2" />
                <span>{isEditing ? "Update Product" : "Create Product"}</span>
              </div>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}