import { StarIcon } from "@heroicons/react/24/solid";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Comment {
  id: number;
  body?: string;
  rate?: number;
  user_name?: string;
  is_buyer?: boolean;
}

/* یک دیدگاه کاربر: آواتار، نام، ستاره‌ها و متن */
export default function CommentCard({ comment }: { comment: Comment }) {
  const rate = comment.rate ?? 0;

  return (
    <li className="py-6">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-amber-100 text-[12px] text-amber-700">
            {comment.user_name?.slice(0, 2) ?? "؟"}
          </AvatarFallback>
        </Avatar>

        <span className="text-[13px] font-medium">
          {comment.user_name ?? "کاربر دیجی‌کالا"}
        </span>

        {comment.is_buyer && (
          <>
            <span className="text-neutral-300">•</span>

            <Badge
              variant="secondary"
              className="bg-green-50 text-[10px] font-normal text-green-700"
            >
              خریدار
            </Badge>
          </>
        )}
      </div>

      {rate > 0 && (
        <div className="mt-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              className={`h-5 w-5 ${
                index < rate ? "text-amber-400" : "text-neutral-300"
              }`}
            />
          ))}
        </div>
      )}

      {comment.body && (
        <p className="mt-3 text-[14px] leading-8 text-neutral-800">
          {comment.body}
        </p>
      )}

      <Separator className="mt-6" />
    </li>
  );
}