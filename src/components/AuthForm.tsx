"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type Mode = "login" | "register";

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "حصل خطأ، حاول تاني");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("الإيميل أو كلمة السر غير صحيحة");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch {
      setError("حصل خطأ في الاتصال، حاول تاني");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* تبديل بين تسجيل الدخول وإنشاء حساب */}
      <div className="mb-8 flex rounded-md border border-ink/10 bg-ink/[0.03] p-1 text-sm font-display font-bold">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-sm py-2 transition-colors ${
            mode === "login" ? "bg-white text-brand shadow-sm" : "text-ink/50"
          }`}
        >
          تسجيل الدخول
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 rounded-sm py-2 transition-colors ${
            mode === "register" ? "bg-white text-brand shadow-sm" : "text-ink/50"
          }`}
        >
          حساب جديد
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">
              الاسم
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-ink/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="اسمك الكامل"
            />
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-ink/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="you@example.com"
            dir="ltr"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">
            كلمة السر
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-ink/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="8 حروف على الأقل"
            dir="ltr"
          />
        </div>

        {error && (
          <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand py-3 font-display font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {loading
            ? "لحظة..."
            : mode === "login"
            ? "تسجيل الدخول"
            : "إنشاء الحساب"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="text-xs text-ink/40">أو تابع باستخدام</span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/[0.03]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62Z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"/>
            <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"/>
          </svg>
          جوجل
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/[0.03]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#1877F2" d="M18 9a9 9 0 1 0-10.4 8.89v-6.29H5.31V9h2.29V7.02c0-2.26 1.35-3.51 3.41-3.51.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41V9h2.5l-.4 2.6h-2.1v6.29A9 9 0 0 0 18 9Z"/>
          </svg>
          فيسبوك
        </button>
      </div>
    </div>
  );
}
