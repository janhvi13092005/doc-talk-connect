
import { supabase } from "@/integrations/supabase/client";

// Doctor types
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
  about?: string;
  education?: string;
  created_at?: string;
  updated_at?: string;
}

// Appointment types
export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  doctor_name?: string;
  doctor_specialty?: string;
  appointment_date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: "video" | "voice" | "chat" | "in-person";
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// User profile type
export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  updated_at?: string;
}

// Doctor APIs
export const getDoctors = async (): Promise<Doctor[]> => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }

  return data || [];
};

export const getDoctorById = async (id: string): Promise<Doctor> => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching doctor with id ${id}:`, error);
    throw error;
  }

  return data;
};

// Appointment APIs
export const getUserAppointments = async (): Promise<Appointment[]> => {
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(`
      *,
      doctors:doctor_id (name, specialty)
    `)
    .order("appointment_date", { ascending: false });

  if (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }

  // Transform the data to match our Appointment interface with proper typing
  return (appointments || []).map((appointment) => ({
    ...appointment,
    doctor_name: appointment.doctors?.name,
    doctor_specialty: appointment.doctors?.specialty,
    // Ensure status and type are properly typed for TypeScript
    status: appointment.status as "pending" | "confirmed" | "completed" | "cancelled",
    type: appointment.type as "video" | "voice" | "chat" | "in-person"
  }));
};

export const createAppointment = async (appointment: Omit<Appointment, "id" | "user_id" | "created_at" | "updated_at">): Promise<Appointment> => {
  // Get the current user's ID
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      ...appointment,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }

  return {
    ...data,
    status: data.status as "pending" | "confirmed" | "completed" | "cancelled",
    type: data.type as "video" | "voice" | "chat" | "in-person"
  };
};

export const updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<Appointment> => {
  const { data, error } = await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating appointment with id ${id}:`, error);
    throw error;
  }

  return {
    ...data,
    status: data.status as "pending" | "confirmed" | "completed" | "cancelled",
    type: data.type as "video" | "voice" | "chat" | "in-person"
  };
};

export const cancelAppointment = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) {
    console.error(`Error cancelling appointment with id ${id}:`, error);
    throw error;
  }
};

// Profile APIs
export const getUserProfile = async (): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }

  return data;
};

export const updateUserProfile = async (updates: Partial<Profile>): Promise<Profile> => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }

  return data;
};
