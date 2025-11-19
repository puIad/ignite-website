import { cn } from "@/lib/utils";
import { useScrollTo } from "../actionts/scrollToRegister";

export function Navbar({ className }: { className?: string }) {
  const scrollTo = useScrollTo();
  return (
    <div>
      <div className={cn("gap-[120px] text-white justify-center hidden lg:flex", className)}>
  <button type="button" onClick={() => scrollTo('what-is-ignite')} className="font-bold text-[14px] uppercase cursor-pointer hover:underline">what is ignite</button>
  <button type="button" onClick={() => scrollTo('previous-editions')} className="font-bold text-[14px] uppercase cursor-pointer hover:underline">previous editions</button>
  <button type="button" onClick={() => scrollTo('speakers-registration')} className="font-bold text-[14px] uppercase cursor-pointer hover:underline">speakers form</button>
  <button type="button" onClick={() => scrollTo('about-us')} className="font-bold text-[14px] uppercase cursor-pointer hover:underline">about us</button>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-1.5">
          <div className="bg-white h-0.5 w-[25px]" />
          <div className="bg-white h-0.5 w-[25px]" />
          <div className="bg-white h-0.5 w-[25px]" />
        </div>
      </div>
    </div>
  )
}
