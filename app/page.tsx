"use client";
import AboutMeWidget from "../components/AboutMeWidget";
import GalleryWidget from "../components/GalleryWidget";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#22252a] text-white lg:flex-row">
      <div className="hidden flex-1 lg:flex" aria-hidden="true"></div>

      <main className="flex w-full flex-1 flex-col gap-4 px-4 py-6 sm:px-6 lg:w-1/2 lg:px-10 lg:py-10">
        <AboutMeWidget />
<div className="h-[3px] w-[80%] rounded-full bg-[#3a3d40] mx-auto" aria-hidden="true"></div>
<GalleryWidget />
<div className="h-[3px] w-[80%] rounded-full bg-[#3a3d40] mx-auto" aria-hidden="true"></div>

      </main>
    </div>
  );
}