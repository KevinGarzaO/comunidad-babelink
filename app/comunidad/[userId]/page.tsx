import { UserProfileComponente } from "../../../components/UserProfile";

export default async function Page({ params }: { params: { userId: string } }) {
  const resolvedParams = await params;
  return <UserProfileComponente userId={resolvedParams.userId} />;
}
