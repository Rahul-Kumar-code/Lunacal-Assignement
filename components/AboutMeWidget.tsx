"use client";
import { useMemo, useState } from "react";
import { BiGridVertical } from "react-icons/bi";

type TabKey = "About Me" | "Experiences" | "Recommended";

const TAB_CONTENT: Record<TabKey, string> = {
  "About Me": `Hi, I'm Rahul Kumar, a B.Tech IT student and a passionate full-stack developer with a strong focus on building MERN stack applications, AI-powered solutions, and cloud-ready products. 
  
  I thrive on creating experiences that seamlessly combine empathy, performance, and clean engineering, ensuring that every solution I build is both user-friendly and technically robust.I specialize in transforming complex problem statements into production-ready products.
  
  My approach emphasizes fast iteration, scalable architecture, and maintainable code, while keeping the end-user and learner experience at the core of the design. I enjoy exploring the intersection of technology, innovation, and practicality, constantly seeking ways to deliver impactful solutions that not only work efficiently but also resonate with users.`,
  Experiences: `I was a Web Development Team Member at USLLS, Delhi, where I actively contribute to maintaining and enhancing the ADR Cell blog. My role involves ensuring a responsive and user-friendly design across devices while optimizing the platform’s performance for smooth navigation. I also manage and organize articles, events, and other content, keeping the platform dynamic, engaging, and up-to-date for the community. Through this experience, I have strengthened my skills in web development, content management, and collaborative team workflows, while delivering a polished and functional online platform.`,
  Recommended: `I am passionate about building full-stack applications with a focus on the MERN stack, AI integration, and cloud-ready solutions. I enjoy transforming complex problems into production-ready products that balance performance, usability, and clean engineering. With a learner-first approach, I continuously explore emerging technologies to deliver innovative solutions that create real-world impact.

I thrive in collaborative environments, contributing effectively to team projects, web development initiatives, and dynamic platforms, while ensuring that every product I build is scalable, responsive, and user-centric. My goal is to combine technical excellence with thoughtful design to deliver meaningful and engaging digital experiences.`,
};

export default function AboutMeWidget() {
  const tabs = useMemo(() => Object.keys(TAB_CONTENT) as TabKey[], []);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full rounded-[26px] bg-[#363c43] p-4 shadow-[0_18px_50px_rgba(4,7,17,0.55)] text-[#d7dbe7] sm:p-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          aria-label="Need help"
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#9ba3b0] border-b-[#6e757e] bg-[#2a3040]/80 text-base font-semibold text-[#858e98] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        >
          ?
        </button>

        <div className="w-full min-w-0 sm:flex-1 sm:pl-5">
          {/* Navigation Tabs */}
          <nav className="scrollbar-hidden relative flex items-center gap-3 overflow-x-auto rounded-3xl bg-[#171717] p-1.5">
            <div
              className="absolute top-2 bottom-1.5 left-1.5 right-1.5 rounded-[20px] bg-[radial-gradient(circle_at_top,#282b33,#1e2023)] transition-all duration-500 ease-in-out"
              style={{
                width: `${100 / tabs.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            ></div>

            {tabs.map((tab, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative z-10 flex-1 cursor-pointer overflow-hidden rounded-[20px] px-5 py-2.5 text-[15px] font-medium transition-all duration-300 sm:text-[16px] ${
                    isActive
                      ? "text-white"
                      : "text-[#9aa1ae] hover:text-[#cfd5e1]"
                  }`}
                >

                  <span className="absolute inset-0 bg-[#1e2023] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                  {/* Label text */}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content Section */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="hidden items-center justify-center sm:flex">
          <BiGridVertical className="h-10 w-10 text-5xl font-bold text-[#4a4e54]" />
        </div>

        <div className="relative flex-1 overflow-hidden rounded-3xl bg-[#2f343d] px-4 py-4 text-[#898a8b] sm:bg-[#363c43] sm:px-5">
          <article
            key={tabs[activeIndex]}
            className="custom-scrollbar max-h-48 overflow-y-auto pr-1 text-[15px] leading-relaxed transition-opacity duration-300 ease-out sm:max-h-56 sm:pr-3 sm:text-[16px]"
          >
            <BiGridVertical className="mb-3 h-10 w-10 text-5xl font-bold text-[#4a4e54] sm:hidden" />
            <p className="whitespace-pre-line">{TAB_CONTENT[tabs[activeIndex]]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
