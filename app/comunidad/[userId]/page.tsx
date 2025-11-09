import { UserProfile } from "../../../components/UserProfile";

export default async function Page({ params }: { params: { userId: string } }) {
  const resolvedParams = await params;
  return <UserProfile userId={resolvedParams.userId} />;
}
