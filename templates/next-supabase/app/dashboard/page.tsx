"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">대시보드</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
          >
            로그아웃
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-gray-600">
            환영합니다, {user.email}님!
          </p>
          <p className="mt-2 text-sm text-gray-400">
            이 페이지를 프로젝트에 맞게 수정해보세요.
          </p>
        </div>
      </div>
    </main>
  );
}
