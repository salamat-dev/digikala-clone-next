    import axios from "axios";

    /* نمونه‌ی axios با آدرس پایه و توکن — فقط سمت سرور استفاده می‌شود */
    const api = axios.create({
        baseURL : process.env.NEXT_PUBLIC_API_URL,
        headers : {
            "one-api-token": process.env.ONE_API_TOKEN,
            "Content-Type": "application/json",
        }
    })

    export default api;

