import Image from "next/image";
import Link from "next/link";

/* پوسترهای دسته‌بندی — عکس و لینک دستی تعریف می‌شوند */
const POSTERS = [
  {
    positions: "-bottom-3 w-full",
    objects: "object-cover",
    href: "/products/13",
    src: "/images/posters/tablet.webp",
    alt: "تبلت",
    desc: "هوشمند در ابعاد بزرگتر",
    text: "text-black/70 lg:text-white",
  },
  {
    positions: "top-4 sm:top-7 left-21 sm:left-37 md:left-22",
    objects: "object-cover object-[0%_0%]",
    href: "/products/9477",
    src: "/images/posters/boots.webp",
    alt: "نیم بوت مردانه",
    desc: "قدم های مردانه و استوار",
    text: "text-white",
  },
  {
    positions: "top-5 right-22 sm:right-35 md:right-20",
    objects: "object-cover object-[100%_0%]",
    href: "/products/8",
    src: "/images/posters/book.webp",
    alt: "کتاب",
    desc: "هر کتابی بخوای اینجاست",
    text: "text-white",
  },
  {
    positions: "top-4 sm:top-5 md:top-10 left-0 md:right-25",
    objects: "object-cover object-[100%_0%]",
    href: "/products/8450",
    src: "/images/posters/tools.webp",
    alt: "ابزارآلات و تجهیزات",
    desc: "آخرین خرید ابزارت",
    text: "text-white",
  },
];

export default function PosterGrid() {
  return (
    <section className="px-3 py-3 lg:px-0">
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
        {POSTERS.map((poster) => (
          <li key={poster.href} className="group">
            <Link
              href={poster.href}
              className="relative block h-30 w-full overflow-hidden rounded-xl bg-muted sm:h-50 md:h-45 lg:h-60"
            >
              {poster.src ? (
                <figure className="relative size-full">
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className={`${poster.objects} transition duration-1000 lg:group-hover:scale-105`}
                  />

                  {/* لایه تیره روی تصویر */}
                  <span className="absolute inset-0 z-5 hidden bg-black/0 transition duration-700 lg:block lg:group-hover:bg-black/45" />

                  {/* متن وسط پوستر */}
                  <figcaption

                    className={`${poster.text} absolute ${poster.positions} z-10 w-1/2 text-center text-[10px] opacity-100 duration-700 md:w-full md:py-2 md:text-[18px] md:font-bold lg:top-1/2 lg:right-auto lg:bottom-auto lg:left-1/2 lg:w-[60%] lg:-translate-1/2 lg:opacity-0 lg:group-hover:opacity-100 xl:w-[80%] xl:text-xl`}
                  >
                    {poster.desc}
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