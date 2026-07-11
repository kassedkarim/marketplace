import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <h1 className="font-display text-3xl font-extrabold text-ink">
        سوقنا
      </h1>
      {session?.user ? (
        <p className="text-ink/70">
          أهلًا، {session.user.name || session.user.email} 👋
        </p>
      ) : (
        <>
          <p className="text-ink/70">لسه مسجلتش دخول</p>
          <Link
            href="/login"
            className="rounded-md bg-brand px-6 py-2.5 font-display font-bold text-white hover:bg-brand-dark"
          >
            تسجيل الدخول
          </Link>
        </>
      )}
    </main>
  );
}
