"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
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
}

const SLIDE_DATA: SlideItem[] = [
  {
    id: 1,
    title: "بهترین گوشی‌های هوشمند",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/mobile.png",
    link: "/products/11",
    posTop: "40%",
    posRight: "60px",
  },
  {
    id: 2,
    title: "جواهرات لوکس برای شما",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/jewelery.png",
    link: "/products/9227",
    posTop: "40%",
    posRight: "120px",
  },
  {
    id: 3,
    title: "پوشاک مردانه",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/men-clothing.png",
    link: "/products/8752",
    posTop: "20%",
    posRight: "80px",
  },
  {
    id: 4,
    title: "با بهترین کفش‌ها قدم بردار",
    subtitle: "برای مشاهده و خرید کلیک کنید",
    img: "/images/firstSlider/shose.png",
    link: "/products/9476",
    posTop: "5%",
    posRight: "35%",
  },
];

/* اسلایدر بنرهای صفحه‌ی اصلی */
export default function FirstSlider() {
  return (
    <section className="w-full rounded-[8px] overflow-hidden h-[30dvh] sm:h-[40dvh] md:h-[50dvh] lg:h-[70dvh] mt-8 lg:mt-0">
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={true}
        loop
        style={{ height: "100%" }}
      >
        {SLIDE_DATA.map((slide) => (
          <SwiperSlide key={slide.id} style={{ height: "100%" }}>
            <Link href={slide.link} style={{ textDecoration: "none" }}>
              <div className="relative w-full h-full cursor-pointer">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full md:object-cover rounded-[8px] bg-black"
                />
                <div
                  className="absolute text-white"
                  style={{
                    top: slide.posTop,
                    left: slide.posRight,
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  }}
                >
                  <h3 className="font-bold leading-tight text-[14px] sm:text-[25px] md:text-[30px] xl:text-[35px]">
                    {slide.title}
                  </h3>
                  <p className="text-[10px] sm:text-[17px] md:text-[20px] xl:text-[25px]">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}