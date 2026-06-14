import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>Profile</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}