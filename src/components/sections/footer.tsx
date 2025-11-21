import { TimeLocationTag } from "../ui/time-location-tag";

export function FooterSection() {
  return (
    <div id="about-us" className="w-screen px-8 py-8 lg:px-20 lg:py-8 flex flex-col justify-between bg-white">
      <div>
        <div className="flex flex-col items-start gap-2">
          <TimeLocationTag />
          <p className="font-display uppercase text-primary text-[30px] lg:text-[60px]">Who are we</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-10 gap-6 lg:gap-20">
          <img src="/logos/vic-black.svg" className="w-[117px] h-[47px] lg:w-[213px] lg:h-[86px]" />

          <div className="h-[250px] w-px bg-black hidden lg:inline" />
          <div className="w-[250px] h-px bg-black lg:hidden" />

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="text-[18px] lg:text-[40px] font-display text-black">VISION & INNOVATION CLUB</p>
            <p className="text-[10px] lg:text-[20px] text-black lg:max-w-[650px]">
              {`
A scientific club founded in 2014 at the National Polytechnic School of Algiers under the supervision of the scientific and cultural association “EL–MAARIFA”, which aims to foster creativity, communication, and innovation among students.
             `}
            </p>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 mt-4 lg:mt-10">
              <p className="uppercase text-[12px] lg:text-[22px]"> <span className="font-display text-[20px] lg:text-[35px] mr-2">15+</span> Major Events</p>
              <div className="w-[100px] h-px bg-black lg:hidden" />
              <p className="uppercase text-[12px] lg:text-[22px]"> <span className="font-display text-[20px] lg:text-[35px] mr-2">200+</span> Active Members</p>
              <div className="w-[100px] h-px bg-black lg:hidden" />
              <p className="uppercase text-[12px] lg:text-[22px]"> <span className="font-display text-[20px] lg:text-[35px] mr-2">800+</span> Alumni</p>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full pt-10 lg:pt-40">
        <div className="h-px w-full bg-black lg:mb-4" />
        <div className="flex gap-10  lg:justify-start lg:gap-20 mb-8 mt-4 lg:mt-0 lg:mb-12">
          <div className="flex flex-col gap-1 lg:gap-2 uppercase text-black font-bold text-[7px] lg:text-[12px]">
            <a href="https://www.enp.edu.dz/en/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">NATIONAL POLYTECHNIC SCHOOL</a>
            <a href="mailto:vic@g.enp.edu.dz" className="cursor-pointer hover:underline">vic@g.enp.edu.dz</a>
          </div>
          <div className="flex flex-col gap-1 lg:gap-2 uppercase text-black font-bold text-[7px] lg:text-[12px]">
            <a href="#what-is-ignite" className="cursor-pointer hover:underline">WHAT IS IGNITE®</a>
            <a href="#previous-editions" className="cursor-pointer hover:underline">PREVIOUS EDITIONS</a>
            <a href="#speakers-registration" className="cursor-pointer hover:underline">SPEAKERS FORM</a>
            <a href="#about-us" className="cursor-pointer hover:underline">ABOUT US</a>
          </div>
          <div className="flex flex-col gap-1 lg:gap-2 uppercase text-black font-bold text-[7px] lg:text-[12px]">
            <a href="https://www.facebook.com/vic.enpa" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">FACEBOOK</a>
            <a href="https://www.instagram.com/vic.enp/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">INSTAGRAM</a>
            <a href="https://www.linkedin.com/company/vicenp/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">LINKEDIN</a>
            <a href="https://www.tiktok.com/@vic.enp" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">TIKTOK</a>
          </div>
        </div>
        <img src="/red-ignite.svg" className="w-full mt-auto" />
      </div>
    </div>
  )

}
