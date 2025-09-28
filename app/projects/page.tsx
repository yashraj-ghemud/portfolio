// Server Component (no "use client" here) 

import Navbar from "@/components/Navbar";
import ClientOnly from "./ClientOnly";

export default function Page() {
  return (
    <>
      <ClientOnly />
      <Navbar />
    </>
  );
}