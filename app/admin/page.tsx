"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Admin Panel</h1>
    </main>
  );
}