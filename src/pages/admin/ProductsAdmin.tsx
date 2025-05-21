import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductsAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleteId(id);
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
      setProducts(products.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleteId(null);
    }
  };

  // دالة تغيير حالة الـ is_featured
  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_featured: !current })
        .eq("id", id);

      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: !current } : p))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/products/new")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-50 p-4 rounded-md flex items-center text-red-700"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </motion.div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <motion.li
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-md mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm font-medium text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* checkbox is_featured */}
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={product.is_featured || false}
                      onChange={() => toggleFeatured(product.id, product.is_featured || false)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteId === product.id}
                    className="text-gray-400 hover:text-red-600"
                  >
                    {deleteId === product.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}