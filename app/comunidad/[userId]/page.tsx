import { UserProfileComponente } from "../../../components/UserProfile";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return <UserProfileComponente userId={userId} />;
}
