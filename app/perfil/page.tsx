import { useAuth } from "@/contexts/AuthContext";
import { UserProfileComponente } from "../../components/UserProfile";

export default function Page() {
  const { user } = useAuth();

  // Evita romper el componente al no tener UID
  if (!user) return <div>Cargando...</div>;

  return <UserProfileComponente userId={user.id} />;
}
