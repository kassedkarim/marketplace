import BrandPanel from "@/components/BrandPanel";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <BrandPanel />
      <div className="flex items-center justify-center bg-paper px-6 py-16">
        <AuthForm />
      </div>
    </main>
  );
}
