import { createHash } from "crypto";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  if (!apiSecret || !apiKey) {
    return Response.json({ error: "Cloudinary not configured" }, { status: 503 });
  }

  const paramsToSign: Record<string, string | number> = await req.json();

  const sorted = Object.keys(paramsToSign)
    .sort()
    .map((k) => `${k}=${paramsToSign[k]}`)
    .join("&");

  const signature = createHash("sha1").update(sorted + apiSecret).digest("hex");

  return Response.json({ signature, api_key: apiKey });
}
