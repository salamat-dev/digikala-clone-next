import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    autoFocus?: boolean;
}

/* ورودی جستجو */
export default function SearchBox({
    value,
    onChange,
    autoFocus,
}: SearchBoxProps) {

    return (
        <div className="relative flex-1">
            {/* آیکون سرچ */}
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            {/* خود Input */}
            <Input
                dir="rtl"
                value={value}
                autoFocus={autoFocus}
                onChange={(e) => onChange(e.target.value)}
                className="h-10 rounded-xl pr-10 pl-2 text-left"
            />

            {!value && (
                <strong className="pointer-events-none absolute opacity-60 right-10 top-1/2 -translate-y-1/2 text-sm text-primary">
                    تهمتن<span> </span>
                    <strong className="text-secondary/80">
                        شاپ
                    </strong>
                </strong>
            )}
        </div>
    );
}
