
// Replace the complex shadcn toast implementation with sonner
import { toast as sonnerToast } from "sonner";

// Simple wrapper around sonner to maintain API compatibility
export const toast = {
  // Core toast methods
  success: (message: string, options = {}) => sonnerToast.success(message, options),
  error: (message: string, options = {}) => sonnerToast.error(message, options),
  warning: (message: string, options = {}) => sonnerToast.warning(message, options),
  info: (message: string, options = {}) => sonnerToast.info(message, options),
  
  // The default method maps to sonner's default toast
  default: (options: any) => {
    if (typeof options === 'string') {
      return sonnerToast(options);
    }
    
    const { title, description, ...rest } = options;
    return sonnerToast(title, { description, ...rest });
  },
  
  // For compatibility with existing code
  dismiss: () => sonnerToast.dismiss(),
};

// For compatibility with components using the useToast hook
export const useToast = () => {
  return {
    toast,
    // Empty array to maintain API compatibility
    toasts: [],
    dismiss: () => sonnerToast.dismiss()
  };
};
