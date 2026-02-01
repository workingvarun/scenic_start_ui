import { useEffect, useState } from "react";
import { isMe } from "./api";
import { Auth, Unauth } from "./pages";

export default function ProtectedApp() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { status } = await isMe();
        setAuthenticated(status === 200);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="text-center flex justify-center items-center h-svh">
        Checking authentication…
      </div>
    );
  }

  return authenticated ? <Auth /> : <Unauth />;
}
