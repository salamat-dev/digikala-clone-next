import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q");
  const page = searchParams.get("page") ?? "1";

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/search`,
    {
      params: {
        q,
        page,
      },
      headers: {
        "one-api-token": process.env.ONE_API_TOKEN!,
      },
    }
  );
  return NextResponse.json(data);
}