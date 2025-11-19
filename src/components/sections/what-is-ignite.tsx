import { Button } from "../ui/button"
import { Logos } from "../ui/logos"
import { Navbar } from "../ui/navbar"

export function WhatIsIgniteSection() {
  return (
  <div id="what-is-ignite" className="relative w-full min-h-screen">
      <img src="/images/noisy-red-mobile.webp" className="absolute lg:hidden h-full object-cover top-0 left-0 -z-10" />
      <img src="/images/noisy-red-desktop.webp" className="absolute hidden h-full object-cover top-0 left-0 lg:inline -z-10" />

      <div className="px-8 py-4 lg:px-20 lg:py-12 min-h-screen flex flex-col justify-between">
        {/* content  */}
        <div className="h-full flex flex-col lg:justify-between">
          {/* navbar  */}
          <div className="w-full">
            <p className="text-black font-bold text-center text-[10px] lg:hidden mx-auto">
            </p>
            <div className="w-full flex justify-end">
              <Navbar className="text-black w-auto" />
            </div>
          </div>

          <div className="flex flex-col lg:pb-20">

            <div className="font-display text-primary">
              <p className="text-[21px] lg:text-[46px]">WHAT IS</p>
              <p className="text-[60px] lg:text-[135px] leading-none pt-2 lg:pt-4 ml-10 lg:ml-20">IGNITE</p>
            </div>

            <div className="flex flex-col gap-2 lg:gap-6 text-[13px] lg:text-[25px]  uppercase font-bold lg:ml-60 mt-5 lg:mt-8">
              <p className="">
                Ignite Algiers is a cultural public speaking event based on an international concept, originally developed in the United States and present in 350 cities worldwide.
              </p>

              {/* <p className="text-black/70 font-medium"> */}
              {/*   IGNITE IS A HIGH-ENERGY GATHERING BUILT AROUND MOMENTUM, WHERE */}
              {/*   <span className="font-bold text-black">PEOPLE SHOW UP</span> */}
              {/*   HUNGRY TO LEVEL UP, COLLIDE WITH */}
              {/*   <span className="font-bold text-black">NEW IDEAS</span>, */}
              {/*   AND LEAVE WITH A FIRE THEY DIDN'T WALK IN WITH. IT'S THE KIND OF */}
              {/*   <span className="font-bold text-black">EVENT</span> */}
              {/*   THAT DOESN'T WASTE TIME ON FLUFF— */}
              {/*   <span className="font-bold text-black">EVERYTHING</span> */}
              {/*   IS DESIGNED TO JOLT YOU OUT OF AUTOPILOT. */}
              {/*   <span className="font-bold text-black">SPEAKERS DROP HARD TRUTHS</span> */}
              {/*   INSTEAD OF MOTIVATIONAL SUGAR, */}
              {/*   <span className="font-bold text-black">WORKSHOPS</span> */}
              {/*   PUSH YOU TO ACTUALLY BUILD INSTEAD OF PASSIVELY WATCH, AND THE ATMOSPHERE FEELS LIKE A MIX OF ADRENALINE, CREATIVITY, AND SLIGHTLY */}
              {/*   <span className="font-bold text-black">CHAOTIC AMBITION</span>. */}
              {/*   WHETHER YOU COME TO */}
              {/*   <span className="font-bold text-black">NETWORK</span>, */}
              {/*   LAUNCH SOMETHING, FIND */}
              {/*   <span className="font-bold text-black">COLLABORATORS</span>, */}
              {/*   OR JUST GET PUNCHED IN THE BRAIN BY */}
              {/*   <span className="font-bold text-black">NEW PERSPECTIVES</span>, */}
              {/*   IGNITE HITS YOU WITH THE SENSE THAT EVERYONE IN THE ROOM IS TRYING TO */}
              {/*   <span className="font-bold text-black">MAKE SOMETHING REAL HAPPEN</span> */}
              {/*   TODAY, NOT "SOMEDAY." */}
              {/*   <span className="font-bold text-black">IT'S RAW, FAST, INTENSE</span>, */}
              {/*   AND ENGINEERED TO LEAVE YOU WITH THE UNCOMFORTABLE BUT ADDICTIVE FEELING THAT YOU SHOULD BE DOING MORE—AND THAT */}
              {/*   <span className="font-bold text-black">YOU ACTUALLY CAN.</span> */}
              {/* </p> */}

              <p className="text-black/90 font-medium">
                Organized for the first time in Algeria by the Vision & Innovation Club, this event offers selected speakers the opportunity to take the stage and present a topic in just 5 minutes, with 20 slides that advance automatically every 15 seconds.
                Ignite Algiers is also enriched by inspiring talks from highly renowned guests , as well as other artistic performances,and entertaining shows.
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-end mt-10 lg:mt-20">
              <Button color="red">REGISTER TO SPEAK AT IGNITE</Button>
            </div>

          </div>


          {/* footer  */}
        </div>
        <div className="w-full flex justify-center lg:justify-between items-end mt-6">
          <Logos color="black" />
        </div>
      </div>
    </div>
  )
}
