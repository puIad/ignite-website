import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import { HeroSection } from '@/components/sections/hero'
import { WhatIsIgniteSection } from '@/components/sections/what-is-ignite'
import { PreviousEditionsSection } from '@/components/sections/previous-editions'
import { FooterSection } from '@/components/sections/footer'
import { useEffect, useState } from 'react'
import { useMotionValue, motion, useSpring, useTransform, useVelocity, useMotionValueEvent } from 'motion/react'
import { cn } from '@/lib/utils'
import useIsMobile from '@/lib/hooks'
import { BuyTicketForm } from '@/components/sections/buy-ticket-form'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [section, setSection] = useState(1)
  return (
    <div id={'main-page'} className="relative flex flex-col items-center justify-center max-w-screen">
      <HeroSection setSection={setSection} />
      <AnimatedSection index={2} section={section} setSection={setSection}>
        <WhatIsIgniteSection section={section} setSection={setSection} />
      </AnimatedSection>

      <AnimatedSection index={3} section={section} setSection={setSection}>
        <PreviousEditionsSection setSection={setSection} />
      </AnimatedSection>

      <AnimatedSection index={4} section={section} setSection={setSection}>
        <BuyTicketForm section={section} />
      </AnimatedSection>

      <AnimatedSection index={5} section={section} setSection={setSection}>
        <FooterSection />
      </AnimatedSection>
    </div>

  )
}

function AnimatedSection({ index, section, setSection, children }: { index: number, section: number, setSection: any, children: React.ReactNode }) {
  const attemptedScroll = useMotionValue(0)
  const { isMobile } = useIsMobile()
  const scroll = useTransform(attemptedScroll, [0, isMobile ? 100 : 400, isMobile ? 101 : 401], [0, 0.6, 1])

  const animatedHeight = useSpring(scroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    restSpeed: 0.001
  })

  const heightVelocity = useVelocity(animatedHeight)
  const yValue = useTransform(animatedHeight, [0, 1], ["100vh", "0vh"])
  const animatedOpacity = useTransform(animatedHeight, [0, 0.7, 1], ["0%", "0%", "100%"])


  const pathD = useTransform(
    animatedHeight,
    (height) => {
      const topY = (1 - height) * 100
      const curve = heightVelocity.get() * (isMobile ? 3 : 6)
      return `M 0 100 L 0 ${topY} Q 50 ${topY - curve} 100 ${topY} L 100 100 Z`
    }
  )

  useMotionValueEvent(animatedHeight, 'change', (current) => {
    if (current === 1 && section === index - 1) {
      setSection(index)
    } else if (current === 0 && section === index) {
      setSection(index - 1)
    }
  })


  const shouldListen = index === section || index === section + 1 || index === section - 1
  useEffect(() => {
    if (!shouldListen) return;
    const limit = isMobile ? 201 : 401
    let wheelTimeout: NodeJS.Timeout;

    const snapToClosest = () => {
      const current = attemptedScroll.get()
      if (current > 0 && current < limit) {
        const target = current > limit / 2 ? limit : 0
        attemptedScroll.set(target)
      }
    }

    // for desktop
    const onWheel = (e: WheelEvent) => {
      clearTimeout(wheelTimeout)
      const delta = e.deltaY
      const isScrollingDown = delta > 0

      const canScroll = isScrollingDown
        ? index === section + 1
        : (index === section || index === section + 1)

      if (canScroll) {
        const newScroll = attemptedScroll.get() + delta
        const clampedScroll = Math.max(0, Math.min(newScroll, limit))
        attemptedScroll.set(clampedScroll)
      }

      wheelTimeout = setTimeout(snapToClosest, 100)
    }
    // for mobile
    let previousY = 0
    const onTouchStart = (event: TouchEvent) => {
      previousY = event.touches[0].clientY
    }

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY
      const deltaY = previousY - currentY;
      const isScrollingDown = deltaY > 0

      const canScroll = isScrollingDown
        ? index === section + 1
        : (index === section || index === section + 1)

      if (canScroll) {
        const newScroll = attemptedScroll.get() + deltaY
        const clampedScroll = Math.max(0, Math.min(newScroll, limit))
        attemptedScroll.set(clampedScroll)
      }
      previousY = currentY;
    }

    const onTouchEnd = () => {
      snapToClosest()
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('wheel', onWheel)
      clearTimeout(wheelTimeout)
    }

  }, [section, isMobile])

  useEffect(() => {
    const limit = isMobile ? 201 : 401
    if (section >= index) {
      attemptedScroll.set(limit)
    } else {
      attemptedScroll.set(0)
    }
  }, [section, index, isMobile])

  return (
    <>
      <motion.div
        className={cn('h-screen absolute w-screen')}
        style={{
          opacity: animatedOpacity,
          y: index === section ? "0vh" : yValue,
          zIndex: 20 + index * 50,
          willChange: "transform, opacity",
          contain: "layout paint"
        }}
      >
        {children}
      </motion.div>

      <motion.svg
        className={cn('absolute w-full h-screen bottom-0 pointer-events-none')}
        style={{ zIndex: (20 + index * 50) - 10 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path d={pathD} fill={index === 3 ? "#750B2B" : 'white'} style={{ pointerEvents: 'auto' }} />
      </motion.svg>

    </>
  )
}
