"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./firstSlider.css";

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  link: string;
  posTop: string;
  posRight: string;
  imgObject?: string
}

const SLIDE_DATA: SlideItem[] = [
  {
    id: 1,
    title: "بهترین گوشی‌های هوشمند",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/mobile.webp",
    link: "/products/11",
    posTop: "5%",
    posRight: "left-1/2 -translate-x-1/2",
    imgObject: "object-[50%_40%] md:object-[50%_30%]",
  },
  {
    id: 2,
    title: "جواهرات لوکس برای شما",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/jewelery.png",
    link: "/products/9227",
    posTop: "40%",
    posRight: "left-[30px] md:left-[120px]",
    imgObject: "object-[100%_0%] lg:object-[80%_50%]",
  },
  {
    id: 3,
    title: "پوشاک مردانه",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/men-clothing.png",
    link: "/products/8752",
    posTop: "20%",
    posRight: "left-[10px] md:left-[80px]",
    imgObject: "object-[100%_50%] md:object-[100%_50%] lg:object-[80%_60%]",
  },
  {
    id: 4,
    title: "با بهترین کفش‌ها قدم بردار",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/shose.png",
    link: "/products/9476",
    posTop: "5%",
    posRight: "left-1/2 -translate-x-1/2",
    imgObject: "object-[50%_40%]",
  },
];

/* دکمه‌های ناوبری — داخل Swiper رندر می‌شود تا به نمونه‌اش دسترسی داشته باشد */
function NavButtons() {
  const swiper = useSwiper();

  return (
    <div className="absolute bottom-5 right-5 z-10 hidden gap-1 lg:flex">
      <button
        type="button"
        aria-label="اسلاید قبلی"
        onClick={() => swiper.slidePrev()}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/85 text-slate-800 transition-colors hover:bg-white"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="اسلاید بعدی"
        onClick={() => swiper.slideNext()}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/85 text-slate-800 transition-colors hover:bg-white"
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </button>

    </div>
  );
}

/* اسلایدر بنرهای صفحه‌ی اصلی */
export default function FirstSlider() {
  return (
    <section className="first-slider mt-8 h-[25dvh] w-full overflow-hidden rounded-[8px] sm:h-[40dvh] md:h-80 lg:mt-0 lg:h-90 xl:h-[70dvh]">
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {SLIDE_DATA.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full">
            <Link href={slide.link} className="block h-full w-full">
              <div className="relative h-full w-full cursor-pointer">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className={`rounded-[8px] bg-black object-cover ${slide.imgObject ?? ""}`}
                />

                <div
                  className={`absolute ${slide.posRight} text-white`}
                  style={{
                    top: slide.posTop,
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  }}
                >
                  <h3 className="text-[14px] font-bold leading-tight sm:text-[25px] md:text-[25px] xl:text-[30px]">
                    {slide.title}
                  </h3>

                  <p className="text-[10px] sm:text-[17px] md:text-[17px] xl:text-[20px] text-center">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* باید فرزند Swiper باشد تا useSwiper کار کند */}
        <NavButtons />
      </Swiper>
    </section>
  );
}