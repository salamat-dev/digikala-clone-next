import {
  IconCash,
  IconHeadset,
  IconPackageExport,
  IconRosetteDiscountCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

const SERVICES = [
  { Icon: IconTruckDelivery, label: "امکان تحویل اکسپرس" },
  { Icon: IconHeadset, label: "۲۴ ساعته، ۷ روز هفته" },
  { Icon: IconCash, label: "امکان پرداخت در محل" },
  { Icon: IconPackageExport, label: "هفت روز ضمانت بازگشت کالا" },
  { Icon: IconRosetteDiscountCheck, label: "ضمانت اصل بودن کالا" },
];

export default function ServiceBar() {
  return (
    <>
    <ul className="flex flex-wrap items-center justify-evenly gap-x-10 gap-y-5 py-8 text-neutral-400 w-full mt-15">
      {SERVICES.map(({ Icon, label }) => (
        <li key={label} className="flex items-center gap-2">
          <Icon size={32} stroke={1.2} />
          <span className="text-[13px]">{label}</span>
        </li>
      ))}
    </ul>
    </>
  );
}