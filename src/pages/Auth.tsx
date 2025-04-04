
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/lib/auth";

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-md soft-shadow fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-primary">Welcome to DocTalk</h1>
          <p className="mt-3 text-lg text-gray-600">Your journey to better health starts here</p>
        </div>
        <AuthModal initialTab="login" />
      </div>
    </div>
  );
};

export default Auth;
