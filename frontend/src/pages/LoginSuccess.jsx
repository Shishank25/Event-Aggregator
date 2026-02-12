import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState("processing"); // processing, success, error

  useEffect(() => {
    const handleLogin = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setTimeout(() => navigate("/"), 2000);
        console.log("No Token Found");
        return;
      }

      const result = await login(token);

      if (result.success) {
        setStatus("success");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setStatus("error");
        setTimeout(() => navigate("/"), 2000);
        console.log("Error during login");
      }
    };

    handleLogin();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center p-8">
        {status === "processing" && (
          <>
            <div className="w-20 h-20 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Completing Login...
            </h2>
            <p className="text-slate-600">Please wait while we set up your account</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Login Successful!
            </h2>
            <p className="text-slate-600">Redirecting to your dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Login Failed
            </h2>
            <p className="text-slate-600">Redirecting to home page...</p>
          </>
        )}
      </div>
    </div>
  );
}