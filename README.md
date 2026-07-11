# سوقنا — منصة تجارية (المرحلة 1: تسجيل الدخول)

## اللي تم عمله في المرحلة دي
- مشروع Next.js 14 (فرانت + باك اند مع بعض)
- تسجيل دخول بـ: إيميل/كلمة سر + جوجل + فيسبوك (عن طريق NextAuth)
- قاعدة بيانات PostgreSQL عن طريق Prisma
- صفحة تسجيل دخول/حساب جديد بتصميم مخصص

## خطوات التشغيل على جهازك

### 1) تثبيت الأدوات المطلوبة (لو مش موجودة عندك)
- Node.js نسخة 18 أو أحدث: https://nodejs.org
- PostgreSQL (أو تقدر تستخدم قاعدة بيانات مجانية من https://neon.tech بدون تنصيب حاجة)

### 2) تثبيت المكتبات
```bash
cd marketplace
npm install
```

### 3) ظبط متغيرات البيئة
```bash
cp .env.example .env
```
افتح ملف `.env` وحط فيه:
- `DATABASE_URL`: رابط قاعدة البيانات بتاعتك
- `NEXTAUTH_SECRET`: نص سري، تقدر تولده بالأمر:
  ```bash
  openssl rand -base64 32
  ```
- بيانات جوجل وفيسبوك (اختياري في البداية — لو مش هتستخدمهم دلوقتي، سيبهم فاضيين وزرار تسجيل الدخول بيهم مش هيشتغل لحد ما تحطهم)

### 4) إنشاء الجداول في قاعدة البيانات
```bash
npx prisma migrate dev --name init
```

### 5) تشغيل المشروع
```bash
npm run dev
```
افتح المتصفح على: http://localhost:3000

## هيكل الملفات المهمة
```
marketplace/
├── prisma/schema.prisma          → مخطط قاعدة البيانات
├── src/
│   ├── app/
│   │   ├── login/page.tsx        → صفحة تسجيل الدخول
│   │   ├── page.tsx              → الصفحة الرئيسية
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts  → منطق تسجيل الدخول
│   │       └── register/route.ts            → إنشاء حساب جديد
│   ├── components/
│   │   ├── AuthForm.tsx          → نموذج الدخول/التسجيل
│   │   └── BrandPanel.tsx        → لوحة الهوية البصرية
│   └── lib/
│       ├── auth.ts               → إعدادات NextAuth
│       └── prisma.ts             → الاتصال بقاعدة البيانات
```

## للحصول على بيانات جوجل وفيسبوك (لو عايز تفعّلهم)
**جوجل**: روح https://console.cloud.google.com/apis/credentials → أنشئ OAuth Client ID → نوع Web Application → في Authorized redirect URIs حط:
`http://localhost:3000/api/auth/callback/google`

**فيسبوك**: روح https://developers.facebook.com/apps → أنشئ تطبيق جديد → فعّل Facebook Login → في Valid OAuth Redirect URIs حط:
`http://localhost:3000/api/auth/callback/facebook`

## الخطوة الجاية
بعد ما تشغل المشروع وتتأكد إن تسجيل الدخول شغال، نكمل على:
- صفحات المنتجات وعرضها
- سلة الشراء
- لوحة تحكم البائع
