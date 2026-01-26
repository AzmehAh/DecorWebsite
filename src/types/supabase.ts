export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  decor: {
    Tables: {
      application_fields: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          logo: string | null
          name: string
          name_ar: string | null
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          logo?: string | null
          name: string
          name_ar?: string | null
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          logo?: string | null
          name?: string
          name_ar?: string | null
          website?: string | null
        }
        Relationships: []
      }
      color_types: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          answer_ar: string | null
          category: string | null
          created_at: string | null
          id: string
          is_published: boolean | null
          order: number | null
          question: string
          question_ar: string | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          answer_ar?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          order?: number | null
          question: string
          question_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          answer_ar?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          order?: number | null
          question?: string
          question_ar?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gloss_types: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          size_name: string
          size_name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          size_name: string
          size_name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          size_name?: string
          size_name_ar?: string | null
        }
        Relationships: []
      }
      product_packages: {
        Row: {
          created_at: string | null
          package_id: string
          product_id: string
        }
        Insert: {
          created_at?: string | null
          package_id: string
          product_id: string
        }
        Update: {
          created_at?: string | null
          package_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_packages_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_packages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          abrasian_resistance: string | null
          abrasion_resistance: string | null
          abrasion_resistance_ar: string | null
          adhesion: string | null
          adhesion_ar: string | null
          application_fields: string | null
          application_note: string | null
          application_note_ar: string | null
          application_temperatures: string | null
          application_temperatures_ar: string | null
          brand_id: string | null
          color: string | null
          color_ar: string | null
          complet_setting: string | null
          complete_setting: string | null
          complete_setting_ar: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          dry_to_handle: string | null
          dry_to_handle_ar: string | null
          dry_to_topcoat: string | null
          dry_to_topcoat_ar: string | null
          dry_to_touch: string | null
          dry_to_touch_ar: string | null
          features: string | null
          features_ar: string | null
          flexibility: string | null
          flexibility_ar: string | null
          gloss: string | null
          gloss_ar: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          method_of_application: string | null
          method_of_application_ar: string | null
          mixing: string | null
          mixing_ar: string | null
          name: string
          name_ar: string | null
          note: string | null
          note_ar: string | null
          notice: string | null
          notice_ar: string | null
          number_of_coats: string | null
          number_of_coats_ar: string | null
          price: number
          recommended_film_thickness: string | null
          recommended_film_thickness_ar: string | null
          recommended_uses: string | null
          recommended_uses_ar: string | null
          specific_gravity: string | null
          specific_gravity_ar: string | null
          storing_conditions: string | null
          storing_conditions_ar: string | null
          surface_preparation: string | null
          surface_preparation_ar: string | null
          surface_types: string | null
          theoretical_spreading_rate: number | null
          theoretical_spreading_rate_ar: string | null
          thinner: string | null
          thinner_ar: string | null
          voc: string | null
          voc_ar: string | null
          volume_solids: string | null
          volume_solids_ar: string | null
          washability: string | null
          washability_ar: string | null
          water_resistance: string | null
          water_resistance_ar: string | null
        }
        Insert: {
          abrasian_resistance?: string | null
          abrasion_resistance?: string | null
          abrasion_resistance_ar?: string | null
          adhesion?: string | null
          adhesion_ar?: string | null
          application_fields?: string | null
          application_note?: string | null
          application_note_ar?: string | null
          application_temperatures?: string | null
          application_temperatures_ar?: string | null
          brand_id?: string | null
          color?: string | null
          color_ar?: string | null
          complet_setting?: string | null
          complete_setting?: string | null
          complete_setting_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          dry_to_handle?: string | null
          dry_to_handle_ar?: string | null
          dry_to_topcoat?: string | null
          dry_to_topcoat_ar?: string | null
          dry_to_touch?: string | null
          dry_to_touch_ar?: string | null
          features?: string | null
          features_ar?: string | null
          flexibility?: string | null
          flexibility_ar?: string | null
          gloss?: string | null
          gloss_ar?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          method_of_application?: string | null
          method_of_application_ar?: string | null
          mixing?: string | null
          mixing_ar?: string | null
          name: string
          name_ar?: string | null
          note?: string | null
          note_ar?: string | null
          notice?: string | null
          notice_ar?: string | null
          number_of_coats?: string | null
          number_of_coats_ar?: string | null
          price: number
          recommended_film_thickness?: string | null
          recommended_film_thickness_ar?: string | null
          recommended_uses?: string | null
          recommended_uses_ar?: string | null
          specific_gravity?: string | null
          specific_gravity_ar?: string | null
          storing_conditions?: string | null
          storing_conditions_ar?: string | null
          surface_preparation?: string | null
          surface_preparation_ar?: string | null
          surface_types?: string | null
          theoretical_spreading_rate?: number | null
          theoretical_spreading_rate_ar?: string | null
          thinner?: string | null
          thinner_ar?: string | null
          voc?: string | null
          voc_ar?: string | null
          volume_solids?: string | null
          volume_solids_ar?: string | null
          washability?: string | null
          washability_ar?: string | null
          water_resistance?: string | null
          water_resistance_ar?: string | null
        }
        Update: {
          abrasian_resistance?: string | null
          abrasion_resistance?: string | null
          abrasion_resistance_ar?: string | null
          adhesion?: string | null
          adhesion_ar?: string | null
          application_fields?: string | null
          application_note?: string | null
          application_note_ar?: string | null
          application_temperatures?: string | null
          application_temperatures_ar?: string | null
          brand_id?: string | null
          color?: string | null
          color_ar?: string | null
          complet_setting?: string | null
          complete_setting?: string | null
          complete_setting_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          dry_to_handle?: string | null
          dry_to_handle_ar?: string | null
          dry_to_topcoat?: string | null
          dry_to_topcoat_ar?: string | null
          dry_to_touch?: string | null
          dry_to_touch_ar?: string | null
          features?: string | null
          features_ar?: string | null
          flexibility?: string | null
          flexibility_ar?: string | null
          gloss?: string | null
          gloss_ar?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          method_of_application?: string | null
          method_of_application_ar?: string | null
          mixing?: string | null
          mixing_ar?: string | null
          name?: string
          name_ar?: string | null
          note?: string | null
          note_ar?: string | null
          notice?: string | null
          notice_ar?: string | null
          number_of_coats?: string | null
          number_of_coats_ar?: string | null
          price?: number
          recommended_film_thickness?: string | null
          recommended_film_thickness_ar?: string | null
          recommended_uses?: string | null
          recommended_uses_ar?: string | null
          specific_gravity?: string | null
          specific_gravity_ar?: string | null
          storing_conditions?: string | null
          storing_conditions_ar?: string | null
          surface_preparation?: string | null
          surface_preparation_ar?: string | null
          surface_types?: string | null
          theoretical_spreading_rate?: number | null
          theoretical_spreading_rate_ar?: string | null
          thinner?: string | null
          thinner_ar?: string | null
          voc?: string | null
          voc_ar?: string | null
          volume_solids?: string | null
          volume_solids_ar?: string | null
          washability?: string | null
          washability_ar?: string | null
          water_resistance?: string | null
          water_resistance_ar?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      surface_types: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      technical_properties: {
        Row: {
          category: string
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          rating_ar: string
          rating_en: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          rating_ar: string
          rating_en: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          rating_ar?: string
          rating_en?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_localized_faq: {
        Args: {
          faq: unknown
          lang: string
        }
        Returns: Json
      }
      get_localized_product: {
        Args: {
          product: unknown
          lang: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      application_fields: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          logo: string | null
          name: string
          name_ar: string | null
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          logo?: string | null
          name: string
          name_ar?: string | null
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          logo?: string | null
          name?: string
          name_ar?: string | null
          website?: string | null
        }
        Relationships: []
      }
      color_types: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          answer_ar: string | null
          category: string | null
          created_at: string | null
          id: string
          is_published: boolean | null
          order: number | null
          question: string
          question_ar: string | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          answer_ar?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          order?: number | null
          question: string
          question_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          answer_ar?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          order?: number | null
          question?: string
          question_ar?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gloss_types: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          size_name: string
          size_name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          size_name: string
          size_name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          size_name?: string
          size_name_ar?: string | null
        }
        Relationships: []
      }
      product_packages: {
        Row: {
          created_at: string | null
          package_id: string
          product_id: string
        }
        Insert: {
          created_at?: string | null
          package_id: string
          product_id: string
        }
        Update: {
          created_at?: string | null
          package_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_packages_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_packages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          abrasian_resistance: string | null
          abrasion_resistance: string | null
          abrasion_resistance_ar: string | null
          adhesion: string | null
          adhesion_ar: string | null
          application_fields: string | null
          application_note: string | null
          application_note_ar: string | null
          application_temperatures: string | null
          application_temperatures_ar: string | null
          brand_id: string | null
          color: string | null
          color_ar: string | null
          complet_setting: string | null
          complete_setting: string | null
          complete_setting_ar: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          dry_to_handle: string | null
          dry_to_handle_ar: string | null
          dry_to_topcoat: string | null
          dry_to_topcoat_ar: string | null
          dry_to_touch: string | null
          dry_to_touch_ar: string | null
          features: string | null
          features_ar: string | null
          flexibility: string | null
          flexibility_ar: string | null
          gloss: string | null
          gloss_ar: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          method_of_application: string | null
          method_of_application_ar: string | null
          mixing: string | null
          mixing_ar: string | null
          name: string
          name_ar: string | null
          note: string | null
          note_ar: string | null
          notice: string | null
          notice_ar: string | null
          number_of_coats: string | null
          number_of_coats_ar: string | null
          price: number
          recommended_film_thickness: string | null
          recommended_film_thickness_ar: string | null
          recommended_uses: string | null
          recommended_uses_ar: string | null
          specific_gravity: string | null
          specific_gravity_ar: string | null
          storing_conditions: string | null
          storing_conditions_ar: string | null
          surface_preparation: string | null
          surface_preparation_ar: string | null
          surface_types: string | null
          theoretical_spreading_rate: number | null
          theoretical_spreading_rate_ar: string | null
          thinner: string | null
          thinner_ar: string | null
          voc: string | null
          voc_ar: string | null
          volume_solids: string | null
          volume_solids_ar: string | null
          washability: string | null
          washability_ar: string | null
          water_resistance: string | null
          water_resistance_ar: string | null
        }
        Insert: {
          abrasian_resistance?: string | null
          abrasion_resistance?: string | null
          abrasion_resistance_ar?: string | null
          adhesion?: string | null
          adhesion_ar?: string | null
          application_fields?: string | null
          application_note?: string | null
          application_note_ar?: string | null
          application_temperatures?: string | null
          application_temperatures_ar?: string | null
          brand_id?: string | null
          color?: string | null
          color_ar?: string | null
          complet_setting?: string | null
          complete_setting?: string | null
          complete_setting_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          dry_to_handle?: string | null
          dry_to_handle_ar?: string | null
          dry_to_topcoat?: string | null
          dry_to_topcoat_ar?: string | null
          dry_to_touch?: string | null
          dry_to_touch_ar?: string | null
          features?: string | null
          features_ar?: string | null
          flexibility?: string | null
          flexibility_ar?: string | null
          gloss?: string | null
          gloss_ar?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          method_of_application?: string | null
          method_of_application_ar?: string | null
          mixing?: string | null
          mixing_ar?: string | null
          name: string
          name_ar?: string | null
          note?: string | null
          note_ar?: string | null
          notice?: string | null
          notice_ar?: string | null
          number_of_coats?: string | null
          number_of_coats_ar?: string | null
          price: number
          recommended_film_thickness?: string | null
          recommended_film_thickness_ar?: string | null
          recommended_uses?: string | null
          recommended_uses_ar?: string | null
          specific_gravity?: string | null
          specific_gravity_ar?: string | null
          storing_conditions?: string | null
          storing_conditions_ar?: string | null
          surface_preparation?: string | null
          surface_preparation_ar?: string | null
          surface_types?: string | null
          theoretical_spreading_rate?: number | null
          theoretical_spreading_rate_ar?: string | null
          thinner?: string | null
          thinner_ar?: string | null
          voc?: string | null
          voc_ar?: string | null
          volume_solids?: string | null
          volume_solids_ar?: string | null
          washability?: string | null
          washability_ar?: string | null
          water_resistance?: string | null
          water_resistance_ar?: string | null
        }
        Update: {
          abrasian_resistance?: string | null
          abrasion_resistance?: string | null
          abrasion_resistance_ar?: string | null
          adhesion?: string | null
          adhesion_ar?: string | null
          application_fields?: string | null
          application_note?: string | null
          application_note_ar?: string | null
          application_temperatures?: string | null
          application_temperatures_ar?: string | null
          brand_id?: string | null
          color?: string | null
          color_ar?: string | null
          complet_setting?: string | null
          complete_setting?: string | null
          complete_setting_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          dry_to_handle?: string | null
          dry_to_handle_ar?: string | null
          dry_to_topcoat?: string | null
          dry_to_topcoat_ar?: string | null
          dry_to_touch?: string | null
          dry_to_touch_ar?: string | null
          features?: string | null
          features_ar?: string | null
          flexibility?: string | null
          flexibility_ar?: string | null
          gloss?: string | null
          gloss_ar?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          method_of_application?: string | null
          method_of_application_ar?: string | null
          mixing?: string | null
          mixing_ar?: string | null
          name?: string
          name_ar?: string | null
          note?: string | null
          note_ar?: string | null
          notice?: string | null
          notice_ar?: string | null
          number_of_coats?: string | null
          number_of_coats_ar?: string | null
          price?: number
          recommended_film_thickness?: string | null
          recommended_film_thickness_ar?: string | null
          recommended_uses?: string | null
          recommended_uses_ar?: string | null
          specific_gravity?: string | null
          specific_gravity_ar?: string | null
          storing_conditions?: string | null
          storing_conditions_ar?: string | null
          surface_preparation?: string | null
          surface_preparation_ar?: string | null
          surface_types?: string | null
          theoretical_spreading_rate?: number | null
          theoretical_spreading_rate_ar?: string | null
          thinner?: string | null
          thinner_ar?: string | null
          voc?: string | null
          voc_ar?: string | null
          volume_solids?: string | null
          volume_solids_ar?: string | null
          washability?: string | null
          washability_ar?: string | null
          water_resistance?: string | null
          water_resistance_ar?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      surface_types: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
        }
        Relationships: []
      }
      technical_properties: {
        Row: {
          category: string
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          rating_ar: string
          rating_en: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          rating_ar: string
          rating_en: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          rating_ar?: string
          rating_en?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_localized_faq: {
        Args: {
          faq: unknown
          lang: string
        }
        Returns: Json
      }
      get_localized_product: {
        Args: {
          product: unknown
          lang: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
