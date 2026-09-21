import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const POSTERS = [
    { positions:"bottom-10 left-30 sm:left-55 md:left-73", href: "/products/10639", src: "/images/posters/kitchen.jpg", alt: "ابزارآلات آشپزی" },
    { positions:"top-10 right-10", href: "/products/6741", src: "/images/posters/baby.jpg", alt: "کودک و نوزاد" },
];

export default function ProductGrid2() {
    return (
        <section className="py-3 px-3 lg:px-0">
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {POSTERS.map((poster) => (
                    <li key={poster.href} className="group">
                        <Link
                            href={poster.href}
                            className="relative block h-30 sm:h-50 md:h-45 lg:h-60 w-full overflow-hidden rounded-xl bg-muted"
                        >
                            {poster.src ? (
                                <figure className="relative size-full">
                                    <Image
                                        src={poster.src}
                                        alt={poster.alt}
                                        fill
                                        sizes="(max-width: 1024px) 45vw, 22vw"
                                        className="object-cover object-[0%_100%] transition duration-1000 lg:group-hover:scale-105"
                                    />

                                    {/* لایه تیره روی تصویر */}
                                    <span className="absolute inset-0 z-5 hidden bg-black/0 transition duration-700 lg:block lg:group-hover:bg-black/45" />

                                    {/* متن وسط پوستر */}
                                    <figcaption
                                        style={{textShadow: "0 2px 8px rgba(0,0,0,0.8)",}}
                                        className={`absolute ${poster.positions} bottom-0 left-0 z-10 w-full text-center text-xs sm:text-2xl font-bold text-white opacity-100 duration-700 md:py-2 md:text-[25px] md:font-bold lg:top-1/2 lg:right-auto lg:bottom-auto lg:left-1/2 lg:w-[60%] lg:-translate-1/2 lg:opacity-0 lg:group-hover:opacity-100 xl:w-[80%] xl:text-xl`}
                                    >
                                        {poster.alt}
                                    </figcaption>

                                    {/* خط عمودی */}
                                    <span className="absolute bottom-[10%] left-[10%] z-20 hidden h-0 w-0.5 bg-white transition-[height] duration-700 ease-out lg:block lg:group-hover:h-[40%]" />

                                    {/* خط افقی */}
                                    <span className="absolute bottom-[10%] left-[10%] z-20 hidden h-0.5 w-0 bg-white transition-[width] duration-700 ease-out lg:block lg:group-hover:w-[40%]" />
                                </figure>
                            ) : (
                                <span className="flex h-full items-center justify-center text-[12px] text-muted-foreground">
                                    {poster.alt}
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}