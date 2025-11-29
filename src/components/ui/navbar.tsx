import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export function Navbar({ className, setSection }: { className?: string; setSection: (section: number) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close menu when clicking outside (mobile)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  const handleNav = (section: number) => {
    setOpen(false);
    setSection(section);
  };

  const links = [
    { section: 2, label: "what is ignite®" },
    { section: 3, label: "previous editions" },
    { section: 4, label: "buy ticket" },
    { section: 5, label: "about us" },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Desktop links */}
      <div className={cn("gap-[120px] text-white justify-center hidden lg:flex", className)}>
        {links.map((l) => (
          <button
            key={l.section}
            type="button"
            onClick={() => handleNav(l.section)}
            className="font-bold text-[14px] uppercase cursor-pointer hover:underline"
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <div className="lg:hidden" ref={menuRef}>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className={`inline-flex items-center justify-center p-2 transform transition active:scale-95 ${open ? 'scale-105' : ''}`}
        >
          <div className="flex flex-col gap-1.5">
            <div className="bg-white h-0.5 w-[25px]" />
            <div className="bg-white h-0.5 w-[25px]" />
            <div className="bg-white h-0.5 w-[25px]" />
          </div>
        </button>

        {/* slide-down menu: render always and toggle visibility for smooth pop animation */}
        <div
          aria-hidden={!open}
          className={`absolute right-0 mt-2 w-56 bg-primary/95 backdrop-blur-sm rounded-md shadow-lg z-50 origin-top-right transform transition ease-out duration-150 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <div className="flex flex-col p-3">
            {links.map((l) => (
              <button
                key={l.section}
                type="button"
                onClick={() => handleNav(l.section)}
                className="text-left px-3 py-2 font-bold text-[16px] uppercase hover:underline text-white"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
