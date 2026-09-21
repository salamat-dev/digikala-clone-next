import type { User } from "@/types/user";

const BASE = "https://6aabc43cea0e22daa6dc966c.mockapi.io/shopUsers";

/* ایمیل‌ها را یکدست می‌کند تا Test@x.com و test@x.com یکی حساب شوند */
const normalize = (email: string) => email.trim().toLowerCase();

/* کاربر را با ایمیل پیدا می‌کند — mockapi همیشه آرایه برمی‌گرداند */
export async function findByEmail(email: string): Promise<User[]> {
  const url = new URL(BASE);
  url.searchParams.append("email", normalize(email));

  const res = await fetch(url);

  // وقتی چیزی پیدا نشود mockapi وضعیت 404 می‌دهد
  if (!res.ok) return [];

  const users: User[] = await res.json();

  if (!Array.isArray(users)) return [];

  // فیلتر mockapi گاهی دقیق نیست، پس خودمان هم چک می‌کنیم
  return users.filter((u) => normalize(u.email) === normalize(email));
}

/* ثبت‌نام؛ اگر ایمیل تکراری باشد خطا می‌دهد */
export async function register(user: Omit<User, "id">): Promise<User> {
  const exist = await findByEmail(user.email);

  if (exist.length > 0) {
    throw new Error("این ایمیل قبلاً ثبت شده است");
  }

  const res = await fetch(BASE, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...user, email: normalize(user.email) }),
  });

  if (!res.ok) throw new Error("ثبت‌نام با مشکل مواجه شد، دوباره تلاش کنید");

  return res.json();
}

/* ورود با ایمیل و رمز */
export async function login(email: string, pass: string): Promise<User> {
  const users = await findByEmail(email);

  if (users.length === 0) {
    throw new Error("کاربری با این ایمیل یافت نشد");
  }

  const user = users.find((u) => u.pass === pass);

  if (!user) {
    throw new Error("رمز عبور اشتباه است");
  }

  return user;
}

/* ویرایش اطلاعات کاربر */
export async function updateUser(
  id: string,
  data: Partial<Omit<User, "id">>
): Promise<User> {
  const payload = data.email
    ? { ...data, email: normalize(data.email) }
    : data;

  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("ویرایش اطلاعات با مشکل مواجه شد");

  return res.json();
}

/* حذف حساب کاربری */
export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("حذف حساب با مشکل مواجه شد");
}