# الرفع على Vercel (لينك حقيقي شغال)

اتبع الخطوات دي بالترتيب — تستغرق حوالي 5-10 دقايق.

## 1) ارفع الكود على GitHub
لو معندكش حساب GitHub، اعمل واحد مجانًا على github.com (دقيقتين).

**لو عندك Git على جهازك:**
```bash
cd marketplace
git init
git add .
git commit -m "أول نسخة - تسجيل الدخول"
```
بعدين روح على github.com → New Repository → اسمه مثلاً `marketplace` → مش هتحط أي ملفات فيه (سيبه فاضي) → اعمل نسخ للأوامر اللي هيوريهولك تحت "…or push an existing repository" ونفذهم.

**لو مش عندك Git خالص:**
روح github.com → New Repository → بعد ما تعمله هيديك خيار "uploading an existing file" → اسحب مجلد المشروع كامل (ما عدا مجلد node_modules لو موجود).

## 2) اربط المشروع بـ Vercel
1. روح https://vercel.com وسجل دخول بحساب GitHub بتاعك (مجاني)
2. دوس **Add New → Project**
3. اختار الـ repository اللي رفعته (`marketplace`)
4. Vercel هيتعرف على إنه مشروع Next.js تلقائيًا — سيب الإعدادات زي ما هي
5. **متدوسش Deploy لسه** — كمل الخطوة الجاية الأول

## 3) اعمل قاعدة بيانات مجانية (دقيقة واحدة)
جوه صفحة إعداد المشروع في Vercel:
1. روح تاب **Storage**
2. دوس **Create Database** → اختار **Neon (Postgres)** أو **Vercel Postgres** (مجاني)
3. هيتوصل تلقائيًا بمتغير `DATABASE_URL` — مش محتاج تعمل حاجة تانية

## 4) ضيف متغيرات البيئة الباقية
جوه تاب **Settings → Environment Variables** ضيف:

| الاسم | القيمة |
|---|---|
| `NEXTAUTH_SECRET` | أي نص عشوائي طويل (استخدم https://generate-secret.vercel.app/32) |
| `NEXTAUTH_URL` | لينك مشروعك على Vercel، هيكون شكله `https://marketplace-xxxx.vercel.app` |

**اختياري (تسجيل جوجل/فيسبوك)** — سيبهم دلوقتي، زرارهم مش هيشتغل لحد ما تحطهم، بس الباقي كله هيشتغل عادي:
| `GOOGLE_CLIENT_ID` | من Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | من Google Cloud Console |
| `FACEBOOK_CLIENT_ID` | من Facebook Developers |
| `FACEBOOK_CLIENT_SECRET` | من Facebook Developers |

## 5) Deploy
دوس **Deploy**. Vercel هيعمل تلقائيًا:
- تثبيت المكتبات
- توليد جداول قاعدة البيانات (`prisma db push` بقى جزء من أمر البناء)
- بناء ونشر الموقع

بعد دقيقة أو اتنين هيديك لينك حقيقي زي:
`https://marketplace-xxxx.vercel.app`

## 6) جرّب
افتح اللينك → `/login` → اعمل حساب جديد بإيميل وكلمة سر → المفروض يدخلك على طول.

---

**لو حصل أي خطأ وقت الـ Deploy**، روح تاب **Deployments** في Vercel، دوس على آخر deployment فشل، وانسخلي رسالة الخطأ اللي في الـ Logs — أنا هحلها فورًا.

**كل مرة تعمل تعديل في الكود وترفعه على GitHub، Vercel هيعمل نشر جديد تلقائيًا لوحده.**
