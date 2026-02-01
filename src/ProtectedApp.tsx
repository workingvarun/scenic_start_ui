import { useState, useEffect } from "react";
import { ScenicApp, KnowYourClient } from "./pages";
import { isMe } from "./api";

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
      <div className="flex h-svh items-center justify-center text-body">
        Checking authentication…
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-svh bg-cover bg-center ${
        authenticated ? "bg-auth" : "bg-unauth"
      }`}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10">
        {authenticated ? <ScenicApp /> : <KnowYourClient />}
      </div>
    </div>
  );
}
