"use client";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";

type GalleryImage = {
  id: string;
  src: string;
  name: string;
  isObjectUrl?: boolean;
};

const INITIAL_IMAGES: GalleryImage[] = [1, 2, 3].map((idx) => ({
  id: `static-${idx}`,
  src: `/images/${idx}.png`,
  name: `Image ${idx}`,
}));

export default function GalleryWidget() {
  const [images, setImages] = useState<GalleryImage[]>(INITIAL_IMAGES);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(200);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const objectUrls = useRef<string[]>([]);

  const measure = useCallback(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const firstCard = trackEl.querySelector<HTMLElement>("[data-gallery-card]");
    if (firstCard) {
      const rect = firstCard.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(trackEl).columnGap || "16");
      setCardWidth(rect.width + gap);
    }

    const { scrollLeft, scrollWidth, clientWidth } = trackEl;
    setCanScroll({
      left: scrollLeft > 4,
      right: scrollLeft + clientWidth < scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    measure();
    const handleScroll = () => measure();
    trackEl.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", measure);

    return () => {
      trackEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure, images.length]);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImageLoad = useCallback(() => {
    requestAnimationFrame(() => measure());
  }, [measure]);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const nextImages: GalleryImage[] = files.map((file, idx) => {
      const objectUrl = URL.createObjectURL(file);
      objectUrls.current.push(objectUrl);
      return {
        id: `upload-${Date.now()}-${idx}`,
        src: objectUrl,
        name: file.name,
        isObjectUrl: true,
      };
    });

    setImages((prev) => [...prev, ...nextImages]);
    event.target.value = "";

    requestAnimationFrame(() => {
      measure();
      if (trackRef.current) {
        trackRef.current.scrollTo({ left: trackRef.current.scrollWidth, behavior: "smooth" });
      }
    });
  };

  const scrollByAmount = useMemo(() => cardWidth || 200, [cardWidth]);

  const scrollTrack = (direction: -1 | 1) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    trackEl.scrollBy({ left: direction * scrollByAmount, behavior: "smooth" });
  };

  return (
    <section className="w-full rounded-2xl bg-[#363c43] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.7)] sm:p-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Need help"
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#9ba3b0] border-b-[#6e757e] bg-[#2a3040]/80 text-base font-semibold text-[#858e98] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
          >
            ?
          </button>
          <div className="rounded-3xl bg-[#171717] px-8 py-2.5 text-[16px] font-medium text-white">Gallery</div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAddClick}
            className="flex items-center gap-2 rounded-full border border-[#515558] border-t-[#5e6268] bg-[#454a51] px-4 py-2 text-sm font-medium text-white shadow-[6px_6px_12px_rgba(0,0,0,0.45)] transition hover:brightness-110"
          >
            <FaPlus className="text-xs" />
            <span>ADD IMAGE</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            disabled={!canScroll.left}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#24272a] text-[#6f787c] transition hover:bg-[#191c20] ${
              canScroll.left ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Scroll gallery left"
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(1)}
            disabled={!canScroll.right}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#24272a] text-[#6f787c] transition hover:bg-[#191c20] ${
              canScroll.right ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Scroll gallery right"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="hidden w-12 justify-center pt-1 sm:flex">
          <BiGridVertical className="h-9 w-9 text-4xl font-bold text-[#4a4e54]" />
        </div>

        <div
          ref={trackRef}
          className="scrollbar-hidden flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto rounded-[20px] bg-[#2b3037]/40 px-2 py-2"
        >
          <div className="flex items-center px-1 sm:hidden">
            <BiGridVertical className="h-8 w-8 text-3xl font-bold text-[#4a4e54]" />
          </div>
          {images.map((image) => (
            <figure
              key={image.id}
              data-gallery-card
              className="group relative h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-[#232730] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1 hover:scale-[1.06] hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)] hover:brightness-110 sm:h-40 sm:w-32 md:h-44 md:w-36"
            >
              <img
                src={image.src}
                alt={image.name}
                onLoad={handleImageLoad}
                className="size-full transform-gpu object-cover transition duration-500 ease-out will-change-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-2"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
