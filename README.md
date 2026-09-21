<div align="center">

# 🛍️ Tahamtan Shop

**A Digikala-inspired e-commerce storefront built with Next.js, TypeScript and shadcn/ui**

RTL-first · Persian UI · Real product data

[![Live Demo](https://img.shields.io/badge/Live_Demo-000?style=for-the-badge&logo=vercel&logoColor=white)](https://digikala-clone-next.vercel.app/)
[![فارسی](https://img.shields.io/badge/README-فارسی-1A237E?style=for-the-badge)](./README.fa.md)

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000?logo=shadcnui)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38)

</div>

---

## ✨ Features

- **Mega menu & mobile categories** — full category tree from the API, with brand and price-range shortcuts that deep-link into filtered results
- **Category pages** — filter by brand, price range, availability, discount and fast shipping; sort and paginate. All state lives in the URL, so results are shareable and survive a refresh
- **Product page** — image gallery, breadcrumb, specs, AI review summary, user comments and a sticky mobile buy bar
- **Live search** — debounced results that link straight to products
- **Home page** — hero slider, deal carousels, poster grid and product rows, with an automatic fallback when the home endpoint is unavailable
- **Auth** — animated login/register card with a diagonal panel transition, real-time Zod validation, profile editing and account deletion
- **Cart** — Zustand store persisted to `localStorage`, with a live badge in the header
- **Polish** — header collapses on scroll, toasts, skeleton loaders, error boundaries, fully responsive

## 🧱 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Animation | Framer Motion, Swiper, Embla Carousel |
| State | Zustand (+ persist) |
| Forms | React Hook Form, Zod |
| Data | Digikala API via [one-api.ir](https://one-api.ir), MockAPI for users |

## 🚀 Getting Started

```bash
git clone https://github.com/salamat-dev/digikala-clone-next.git
cd digikala-clone-next
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://api.one-api.ir/digikala/v1
ONE_API_TOKEN=your_one_api_token
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Demo account:** tick *"Login with demo account"* on the login page, or use `admin@gmail.com` / `admin`.

## 📁 Structure

```
src/
├── app/          # routes: home, products/[category], product/[id], auth, cart, profile
├── components/   # UI grouped by feature (Header, products, home, auth, cart)
├── services/     # API calls and response normalizers
├── store/        # Zustand stores (auth, cart)
├── hooks/        # useSearch, useHideOnScroll
├── lib/          # helpers (category links, formatting)
└── types/        # API and domain types
```

## 📝 Notes

- Filtering and sorting run on the server over the products each category returns, because the API proxy does not forward filter parameters.
- Authentication is a front-end demo backed by MockAPI. Passwords are **not** hashed — do not reuse a real password.
- This is a portfolio project for learning purposes and is not affiliated with Digikala.

---

<div align="center">

Built by **AmirMahdi** · [GitHub](https://github.com/salamat-dev)

</div>




<div dir="rtl" align="center">

# 🛍️ تهمتن شاپ

**فروشگاه اینترنتی با الهام از دیجی‌کالا، ساخته‌شده با Next.js، TypeScript و shadcn/ui**

راست‌چین · رابط فارسی · داده‌ی واقعی محصولات

[![live demo](https://img.shields.io/badge/دموی_زنده-000?style=for-the-badge&logo=vercel&logoColor=white)](https://digikala-clone-next.vercel.app/)
[![English](https://img.shields.io/badge/README-English-00B0FF?style=for-the-badge)](./README.md)

</div>

<div dir="rtl">

---

## ✨ امکانات

- **مگامنو و دسته‌بندی موبایل** — درخت کامل دسته‌ها از API، با میان‌برهای برند و بازه‌ی قیمت که مستقیم به نتایج فیلترشده می‌روند
- **صفحه‌ی دسته‌بندی** — فیلتر برند، بازه‌ی قیمت، موجودی، تخفیف و ارسال سریع، به‌همراه مرتب‌سازی و صفحه‌بندی. همه‌ی وضعیت در URL نگه داشته می‌شود تا لینک قابل اشتراک باشد و با رفرش از بین نرود
- **صفحه‌ی محصول** — گالری تصاویر، مسیر دسته‌بندی، مشخصات فنی، جمع‌بندی هوشمند نظرات، دیدگاه کاربران و نوار خرید چسبان در موبایل
- **جستجوی زنده** — نتایج با تأخیر هوشمند (debounce) که مستقیم به صفحه‌ی محصول لینک می‌شوند
- **صفحه‌ی اصلی** — اسلایدر بنر، کاروسل پیشنهادها، پوسترها و ردیف‌های محصول، با جایگزین خودکار وقتی اندپوینت صفحه‌ی اصلی در دسترس نیست
- **احراز هویت** — کارت ورود و ثبت‌نام با انیمیشن پنل مورب، اعتبارسنجی لحظه‌ای با Zod، ویرایش پروفایل و حذف حساب
- **سبد خرید** — استور Zustand ذخیره‌شده در `localStorage` با نشان تعداد در هدر
- **جزئیات** — جمع شدن هدر هنگام اسکرول، اعلان‌ها، اسکلتون بارگذاری، مدیریت خطا و طراحی کاملاً واکنش‌گرا

## 🧱 تکنولوژی‌ها

| بخش | ابزار |
| --- | --- |
| فریم‌ورک | Next.js 16 (App Router و Server Components) |
| زبان | TypeScript |
| استایل | Tailwind CSS v4 و shadcn/ui |
| انیمیشن | Framer Motion، Swiper، Embla Carousel |
| مدیریت وضعیت | Zustand به‌همراه persist |
| فرم | React Hook Form و Zod |
| داده | API دیجی‌کالا از طریق [one-api.ir](https://one-api.ir) و MockAPI برای کاربران |

## 🚀 راه‌اندازی

</div>

```bash
git clone https://github.com/salamat-dev/digikala-clone-next.git
cd digikala-clone-next
npm install
```

<div dir="rtl">

یک فایل `.env.local` در ریشه‌ی پروژه بسازید:

</div>

```env
NEXT_PUBLIC_API_URL=https://api.one-api.ir/digikala/v1
ONE_API_TOKEN=your_one_api_token
```

```bash
npm run dev
```

<div dir="rtl">

سپس [http://localhost:3000](http://localhost:3000) را باز کنید.

> **حساب آزمایشی:** در صفحه‌ی ورود گزینه‌ی «ورود با حساب آزمایشی» را بزنید، یا از `admin@gmail.com` و رمز `admin` استفاده کنید.

## 📁 ساختار پروژه

</div>

```
src/
├── app/          # مسیرها: خانه، دسته‌بندی، محصول، ورود، سبد، پروفایل
├── components/   # کامپوننت‌ها به تفکیک بخش
├── services/     # فراخوانی API و نرمال‌سازی پاسخ‌ها
├── store/        # استورهای Zustand (کاربر و سبد)
├── hooks/        # useSearch و useHideOnScroll
├── lib/          # توابع کمکی
└── types/        # تایپ‌های API و دامنه
```

<div dir="rtl">

## 📝 نکات

- فیلتر و مرتب‌سازی سمت سرور روی محصولاتی انجام می‌شود که هر دسته برمی‌گرداند، چون پروکسی API پارامترهای فیلتر را به دیجی‌کالا ارسال نمی‌کند.
- احراز هویت یک نمونه‌ی نمایشی سمت کلاینت روی MockAPI است و رمزها **هش نمی‌شوند** — از رمز واقعی خود استفاده نکنید.
- این پروژه صرفاً برای نمونه‌کار و یادگیری ساخته شده و ارتباطی با دیجی‌کالا ندارد.

---

<div align="center">

ساخته‌شده توسط **امیرمهدی** · [GitHub](https://github.com/salamat-dev)

</div>

</div>
