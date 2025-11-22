import { UserProfileComponente } from "../../../components/UserProfile";

export default function Page({ params }: { params: { userId: string } }) {
  return <UserProfileComponente userId={params.userId} />;
}
