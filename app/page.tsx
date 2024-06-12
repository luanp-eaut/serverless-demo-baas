"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const txt = user
    ? "Serverless Computing Demo"
    : "Hãy đăng nhập để sử dụng hệ thống";
  return (
    <main className="flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 h-full">
      <h1 className="text-5xl font-bold m-auto">{txt}</h1>
    </main>
  );
}
