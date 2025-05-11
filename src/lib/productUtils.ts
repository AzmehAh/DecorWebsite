import { supabase } from "./supabase";
import type { Database } from "../types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface FilterOptions {
  filters?: {
    application_fields?: string[];
    surface_types?: string[];
    color?: string[];
    gloss?: string[];
    search?: string;
  };
  limit?: number;
  offset?: number;
  orderBy?: {
    column: string;
    ascending: boolean;
  };
}

// Function to fetch products with filtering, pagination, and ordering
export async function fetchProducts(
  language: string,
  options: FilterOptions = {},
) {
  try {
    let query = supabase.from("products").select("*", { count: "exact" });

    // Apply filters if provided
    if (options.filters) {
      const { application_fields, surface_types, color, gloss, search } =
        options.filters;

      // Filter by application fields
      if (application_fields && application_fields.length > 0) {
        query = query.eq('application_fields', application_fields[0]);
      }

      // Filter by surface types
      if (surface_types && surface_types.length > 0) {
        query = query.eq('surface_types', surface_types[0]);
      }

      // Filter by color
      if (color && color.length > 0) {
        // Use ilike for case-insensitive partial matching for each color
        const colorConditions = color.map((c) => `color.ilike.%${c}%`);
        query = query.or(colorConditions.join(","));
      }

      // Filter by gloss
      if (gloss && gloss.length > 0) {
        // Use ilike for case-insensitive partial matching for each gloss type
        const glossConditions = gloss.map((g) => `gloss.ilike.%${g}%`);
        query = query.or(glossConditions.join(","));
      }

      // Search in name and description based on language
      if (search && search.trim() !== "") {
        const searchTerm = `%${search.trim().toLowerCase()}%`;
        if (language === "ar") {
          query = query.or(
            `name_ar.ilike.${searchTerm},description_ar.ilike.${searchTerm},name.ilike.${searchTerm},description.ilike.${searchTerm}`,
          );
        } else {
          query = query.or(
            `name.ilike.${searchTerm},description.ilike.${searchTerm}`,
          );
        }
      }
    }

    // Apply ordering
    if (options.orderBy) {
      const { column, ascending } = options.orderBy;
      query = query.order(column, { ascending });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1,
      );
    }

    // Execute query with timeout
    const result = await query;

    return {
      data: result.data as Product[],
      count: result.count as number,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Improved function for updating product with packages
export async function updateProduct(
  id: string,
  selectedPackages: string[] = [], // Make selectedPackages optional with default empty array
  productData: Partial<Product>,
  onSuccess?: () => void,
  onError?: (message: string) => void
) {
  try {
    // Start a transaction using supabase
    // First update the product
    const { data: updatedProduct, error: productError } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id)
      .select();

    if (productError) throw productError;
    
    // Delete existing package links
    const { error: deleteError } = await supabase
      .from("product_packages")
      .delete()
      .eq("product_id", id);
      
    if (deleteError) throw deleteError;

    // Add new package links if any packages selected
    if (selectedPackages.length > 0) {
      const packageLinks = selectedPackages.map((packageId) => ({
        product_id: id,
        package_id: packageId,
      }));

      const { error: insertError } = await supabase
        .from("product_packages")
        .insert(packageLinks);

      if (insertError) throw insertError;
    }

    if (onSuccess) onSuccess();
    return { 
      success: true, 
      data: updatedProduct?.[0] as Product, 
      message: "Product updated successfully" 
    };
  } catch (error: any) {
    console.error("Error updating product:", error);
    if (onError) onError(error.message || "Failed to update product");
    return { 
      success: false, 
      data: null, 
      message: error.message || "Failed to update product" 
    };
  }
}

// Function to fetch unique values for a specific column from products table
export async function fetchUniqueProductValues(
  column: string,
): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(column)
      .not(column, "is", null);

    if (error) throw error;

    // Extract unique values
    const uniqueValues = new Set<string>();
    data.forEach((item) => {
      const value = item[column as keyof typeof item];
      if (typeof value === "string" && value.trim() !== "") {
        uniqueValues.add(value);
      }
    });

    return Array.from(uniqueValues);
  } catch (error) {
    console.error(`Error fetching unique ${column} values:`, error);
    return [];
  }
}