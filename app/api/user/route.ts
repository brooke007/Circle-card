// "use server";
import { NextResponse } from "next/server";
import { findUser, createUser, getUserByCustomDomain, getUserUrls, updateUserUrls } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const customDomain = searchParams.get("customDomain");

  if (username) {
    const user = await getUserByCustomDomain(username);
    return NextResponse.json(user);
  } else if (customDomain) {
    const urls = await getUserUrls(customDomain);
    return NextResponse.json(urls);
  }

  return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, username, password, customDomain, urls } = body;

  switch (action) {
    case "login":
      const user = await findUser(username, password);
      console.log(user);
      return NextResponse.json(user);
    case "register":
      const newUser = await createUser(username, password);
      return NextResponse.json(newUser);
    case "updateUrls":
      await updateUserUrls(customDomain, urls);
      return NextResponse.json({ success: true });
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}
