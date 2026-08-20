# Advocat in Türkiye

Av. Ruslana Pasecinic için hazırlanmış çok dilli hukuk bürosu web sitesi ve Supabase destekli içerik yönetim paneli.

## Yerel geliştirme

Gereksinimler:

- Node.js 24.x
- npm

Kurulum:

```bash
npm install
npm run dev
```

Site `http://localhost:3000`, yönetim paneli `http://localhost:3000/admin` adresinde açılır.

## Ortam değişkenleri

Yerel kullanımda `.env.local`, Vercel üzerinde Project Settings → Environment Variables bölümüne şu değerler eklenmelidir:

```env
SUPABASE_URL=https://PROJECT_REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxx
```

Bu değerleri kaynak koduna veya Git deposuna eklemeyin.

## Kontroller

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Vercel

`vercel.json` framework ayarını Next.js olarak sabitler. `main` dalına gönderilen commitler Vercel Git entegrasyonu üzerinden otomatik olarak yayınlanır.

Yönetici erişimi Supabase Authentication kullanıcısının `public.admin_users` tablosundaki `user_id` değeriyle eşleşmesine bağlıdır.
