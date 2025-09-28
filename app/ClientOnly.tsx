"use client";
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading Home...</div>
    </div>
  ),
});

export default function ClientOnly() {
  return <HomeClient />;
          
          
          
          
          
          
          
          
}
