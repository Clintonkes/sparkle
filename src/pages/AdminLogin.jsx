import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blade flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <a href="/" className="inline-block">
            <span className="font-display text-4xl font-semibold tracking-tight text-linen">
              AVENESS
            </span>
          </a>
          <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mt-3">
            ADMIN PORTAL
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-linen p-8 lg:p-10"
        >
          <h2 className="font-display text-2xl font-light text-blade mb-8">
            Sign in to dashboard
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-2 block">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@avenessllc.com"
                className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label className="font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-2 block">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 pr-9 text-lg font-light outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-blade/40 hover:text-blade transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 w-full px-7 py-4 bg-gold text-obsidian text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors mt-8 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"} <LogIn size={16} />
          </button>
        </form>

        <p className="text-center text-linen/40 text-xs font-mono-coord mt-6">
          © {new Date().getFullYear()} AVENESS LLC
        </p>
      </div>
    </div>
  );
}
