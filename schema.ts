export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
      carts: {
        Row: {
          countity: number
          flavor: string
          id: number
          imageUrl: string
          itemId: number
          name: string
          price: number
          userId: number
        }
        Insert: {
          countity: number
          flavor: string
          id?: number
          imageUrl: string
          itemId: number
          name: string
          price: number
          userId: number
        }
        Update: {
          countity?: number
          flavor?: string
          id?: number
          imageUrl?: string
          itemId?: number
          name?: string
          price?: number
          userId?: number
        }
      }
      favorites: {
        Row: {
          id: number
          itemIdFav: Json[] | null
          userId: number
        }
        Insert: {
          id: number
          itemIdFav?: Json[] | null
          userId: number
        }
        Update: {
          id?: number
          itemIdFav?: Json[] | null
          userId?: number
        }
      }
      items: {
        Row: {
          category: string
          content: string
          description: string
          flavor: string | null
          id: number
          imageUrl: string
          name: string
          price: number | null
        }
        Insert: {
          category: string
          content: string
          description: string
          flavor?: string | null
          id: number
          imageUrl: string
          name: string
          price?: number | null
        }
        Update: {
          category?: string
          content?: string
          description?: string
          flavor?: string | null
          id?: number
          imageUrl?: string
          name?: string
          price?: number | null
        }
      }
      purchaseHistories: {
        Row: {
          id: number
          items: Json[] | null
          userId: number
        }
        Insert: {
          id?: number
          items?: Json[] | null
          userId: number
        }
        Update: {
          id?: number
          items?: Json[] | null
          userId?: number
        }
      }
      subscription: {
        Row: {
          id: number
          items: Json | null
          userId: number
        }
        Insert: {
          id?: number
          items?: Json | null
          userId: number
        }
        Update: {
          id?: number
          items?: Json | null
          userId?: number
        }
      }
      subscriptionCart: {
        Row: {
          countity: number
          flavor: string
          id: number
          imageUrl: string
          itemId: number
          name: string
          price: number
          userId: number
        }
        Insert: {
          countity: number
          flavor: string
          id?: number
          imageUrl: string
          itemId: number
          name: string
          price: number
          userId: number
        }
        Update: {
          countity?: number
          flavor?: string
          id?: number
          imageUrl?: string
          itemId?: number
          name?: string
          price?: number
          userId?: number
        }
      }
      subscriptionHistories: {
        Row: {
          id: number
          items: Json | null
          userId: number
        }
        Insert: {
          id?: number
          items?: Json | null
          userId: number
        }
        Update: {
          id?: number
          items?: Json | null
          userId?: number
        }
      }
      users: {
        Row: {
          aza: string
          building: string | null
          city: string
          email: string
          firstName: string
          firstNameKana: string
          id: number
          lastName: string
          lastNameKana: string
          middleName: string | null
          password: string
          passwordConfirmation: string
          postCode: string
          prefecture: string
          tel: string
        }
        Insert: {
          aza: string
          building?: string | null
          city: string
          email: string
          firstName: string
          firstNameKana: string
          id?: number
          lastName: string
          lastNameKana: string
          middleName?: string | null
          password: string
          passwordConfirmation: string
          postCode: string
          prefecture: string
          tel: string
        }
        Update: {
          aza?: string
          building?: string | null
          city?: string
          email?: string
          firstName?: string
          firstNameKana?: string
          id?: number
          lastName?: string
          lastNameKana?: string
          middleName?: string | null
          password?: string
          passwordConfirmation?: string
          postCode?: string
          prefecture?: string
          tel?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
