"use client";
import dynamic from "next/dynamic";

const ProjectsClient = dynamic(() => import("./ProjectsClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] flex items-center justify-center text-neutral-300">
      Loading projects…
    </div>
  ),
});

export default function ClientOnly() {
  return <ProjectsClient />;
}
