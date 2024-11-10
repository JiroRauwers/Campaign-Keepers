export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      campaign_sheets: {
        Row: {
          campaign_id: string;
          sheet_id: string;
        };
        Insert: {
          campaign_id: string;
          sheet_id: string;
        };
        Update: {
          campaign_id?: string;
          sheet_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_sheets_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["campaign_id"];
          },
          {
            foreignKeyName: "campaign_sheets_sheet_id_fkey";
            columns: ["sheet_id"];
            isOneToOne: false;
            referencedRelation: "sheets";
            referencedColumns: ["sheet_id"];
          },
        ];
      };
      campaigns: {
        Row: {
          campaign_date: string | null;
          campaign_id: string;
          description: string | null;
          name: string;
          world_id: string | null;
        };
        Insert: {
          campaign_date?: string | null;
          campaign_id?: string;
          description?: string | null;
          name: string;
          world_id?: string | null;
        };
        Update: {
          campaign_date?: string | null;
          campaign_id?: string;
          description?: string | null;
          name?: string;
          world_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaigns_world_id_fkey";
            columns: ["world_id"];
            isOneToOne: false;
            referencedRelation: "worlds";
            referencedColumns: ["world_id"];
          },
        ];
      };
      p_configs: {
        Row: {
          data: Json | null;
          id: string;
          name: string;
        };
        Insert: {
          data?: Json | null;
          id?: string;
          name: string;
        };
        Update: {
          data?: Json | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      p_shared: {
        Row: {
          config_id: string | null;
          data: Json | null;
          id: string;
          name: string;
        };
        Insert: {
          config_id?: string | null;
          data?: Json | null;
          id?: string;
          name: string;
        };
        Update: {
          config_id?: string | null;
          data?: Json | null;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "p_shared_config_id_fkey";
            columns: ["config_id"];
            isOneToOne: false;
            referencedRelation: "p_configs";
            referencedColumns: ["id"];
          },
        ];
      };
      p_sheets: {
        Row: {
          config_id: string | null;
          data: Json | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          config_id?: string | null;
          data?: Json | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          config_id?: string | null;
          data?: Json | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "p_sheets_config_id_fkey";
            columns: ["config_id"];
            isOneToOne: false;
            referencedRelation: "p_configs";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      sheet_templates: {
        Row: {
          created_at: string;
          data: Json | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          name?: string;
        };
        Update: {
          created_at?: string;
          data?: Json | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      sheets: {
        Row: {
          character_name: string;
          created_by: string | null;
          player_name: string;
          sheet_id: string;
          stats: Json | null;
          type: Database["public"]["Enums"]["sheet_type"];
          world_id: string | null;
        };
        Insert: {
          character_name: string;
          created_by?: string | null;
          player_name: string;
          sheet_id?: string;
          stats?: Json | null;
          type: Database["public"]["Enums"]["sheet_type"];
          world_id?: string | null;
        };
        Update: {
          character_name?: string;
          created_by?: string | null;
          player_name?: string;
          sheet_id?: string;
          stats?: Json | null;
          type?: Database["public"]["Enums"]["sheet_type"];
          world_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sheets_world_id_fkey";
            columns: ["world_id"];
            isOneToOne: false;
            referencedRelation: "worlds";
            referencedColumns: ["world_id"];
          },
        ];
      };
      user_sheets: {
        Row: {
          access: Database["public"]["Enums"]["access_level"];
          sheet_id: string;
          user_id: string;
        };
        Insert: {
          access: Database["public"]["Enums"]["access_level"];
          sheet_id: string;
          user_id: string;
        };
        Update: {
          access?: Database["public"]["Enums"]["access_level"];
          sheet_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_sheets_sheet_id_fkey";
            columns: ["sheet_id"];
            isOneToOne: false;
            referencedRelation: "sheets";
            referencedColumns: ["sheet_id"];
          },
          {
            foreignKeyName: "user_sheets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_world: {
        Row: {
          access: Database["public"]["Enums"]["access_level"];
          user_id: string;
          world_id: string;
        };
        Insert: {
          access: Database["public"]["Enums"]["access_level"];
          user_id: string;
          world_id: string;
        };
        Update: {
          access?: Database["public"]["Enums"]["access_level"];
          user_id?: string;
          world_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_world_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_world_world_id_fkey";
            columns: ["world_id"];
            isOneToOne: false;
            referencedRelation: "worlds";
            referencedColumns: ["world_id"];
          },
        ];
      };
      world_events: {
        Row: {
          event_date: string;
          event_description: string | null;
          event_id: string;
          event_name: string;
          world_id: string | null;
        };
        Insert: {
          event_date: string;
          event_description?: string | null;
          event_id?: string;
          event_name: string;
          world_id?: string | null;
        };
        Update: {
          event_date?: string;
          event_description?: string | null;
          event_id?: string;
          event_name?: string;
          world_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "world_events_world_id_fkey";
            columns: ["world_id"];
            isOneToOne: false;
            referencedRelation: "worlds";
            referencedColumns: ["world_id"];
          },
        ];
      };
      worlds: {
        Row: {
          created_by: string | null;
          description: string | null;
          month_size: number;
          name: string;
          week_size: number;
          world_id: string;
          year_size: number;
        };
        Insert: {
          created_by?: string | null;
          description?: string | null;
          month_size?: number;
          name: string;
          week_size?: number;
          world_id?: string;
          year_size?: number;
        };
        Update: {
          created_by?: string | null;
          description?: string | null;
          month_size?: number;
          name?: string;
          week_size?: number;
          world_id?: string;
          year_size?: number;
        };
        Relationships: [
          {
            foreignKeyName: "worlds_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_accessible_worlds: {
        Args: {
          id_user: string;
        };
        Returns: {
          world_id: string;
          name: string;
          description: string;
          created_by: string;
          week_size: number;
          month_size: number;
          year_size: number;
        }[];
      };
    };
    Enums: {
      access_level: "view" | "edit" | "owner";
      sheet_type: "PC" | "NPC" | "OBJECT";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
