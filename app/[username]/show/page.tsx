import { notFound } from "next/navigation";
import ProfileShow from "@/components/profile-show";
import GoBack from "@/components/go-back";

async function getUser(username: string) {
  const response = await fetch(`/api/user?username=${username}`);
  if (!response.ok) return null;
  return response.json();
}

async function getUserUrls(customDomain: string) {
  const response = await fetch(`/api/user?customDomain=${customDomain}`);
  if (!response.ok) return [];
  return response.json();
}

export default async function ShowPage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);

  if (!user) {
    notFound();
  }

  const socialLinks = await getUserUrls(user.customDomain);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="fixed top-4 left-4">
        <GoBack />
      </div>
      <ProfileShow urls={socialLinks} username={user.customDomain} />
    </div>
  );
}
