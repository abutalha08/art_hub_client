"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@heroui/react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const BANNER_SLIDES = [
  {
    tag: "Original Art Marketplace",
    heading: "Where Art Finds Its Collector",
    subheading:
      "Thousands of original works from emerging and established artists worldwide.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop",
  },
  {
    tag: "Curated Digital Collections",
    heading: "Discover Future Digital Masterpieces",
    subheading:
      "Unique tokens and verified digital media curated by expert collectors globally.",
    image:
      "https://images.unsplash.com/photo-1541367777708-7905fe3296c0",
  },
  {
    tag: "Exclusive Artist Showcases",
    heading: "Empowering Voices Through Canvas",
    subheading:
      "Connect directly with creators and uncover the stories hidden behind every stroke.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length
    );
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] lg:h-screen min-h-[600px] bg-[#0C0C14] overflow-hidden flex items-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${BANNER_SLIDES[current].image})`,
            }}
          />
        </AnimatePresence>

        {/*STRONG LEFT DARK + SOFT RIGHT FADE */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0C0C14]/90 via-[#0C0C14]/60 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0C0C14]/50 via-transparent to-[#0C0C14]/20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full pt-32 pb-12">

        <div className="max-w-3xl my-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial="hidden" animate="visible" exit="hidden">

              <motion.div
                custom={0}
                variants={textVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201633]/80 border border-[#432371]/60 text-xs text-[#B342F2] mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F242C2] animate-pulse" />
                {BANNER_SLIDES[current].tag}
              </motion.div>

              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
              >
                {BANNER_SLIDES[current].heading}
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                className="text-base sm:text-lg text-[#C7C7D6] max-w-xl mb-8"
              >
                {BANNER_SLIDES[current].subheading}
              </motion.p>

              <motion.div custom={3} variants={textVariants} className="flex gap-4 flex-wrap">

                <Link href="/artworks">
                  <Button
                    radius="md"
                    size="lg"
                    className="h-12 sm:h-14 px-6 sm:px-8 text-white bg-gradient-to-r from-[#8E32D9] via-[#B342F2] to-[#E032C4]"
                    endContent={<FiArrowRight />}
                  >
                    Explore Now
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    radius="md"
                    size="lg"
                    variant="bordered"
                    className="h-12 sm:h-14 px-6 sm:px-8 text-white border-white/10 bg-white/5"
                  >
                    Sell Your Art
                  </Button>
                </Link>

              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-[#27273A]/20">

          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[#161622]/40 border border-white/10 flex items-center justify-center">
              <FiChevronLeft />
            </button>

            <div className="flex gap-2">
              {BANNER_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 bg-[#8E32D9] rounded-full transition-all duration-300"
                  style={{ width: current === i ? "32px" : "8px" }}
                />
              ))}
            </div>

            <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[#161622]/40 border border-white/10 flex items-center justify-center">
              <FiChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-6 text-white">
            <div>
              <p className="text-xl font-bold">2,400+</p>
              <p className="text-xs text-[#A1A1B5]">Artworks</p>
            </div>
            <div className="w-px h-8 bg-[#27273A]" />
            <div>
              <p className="text-xl font-bold">180+</p>
              <p className="text-xs text-[#A1A1B5]">Artists</p>
            </div>
            <div className="w-px h-8 bg-[#27273A]" />
            <div>
              <p className="text-xl font-bold">12K+</p>
              <p className="text-xs text-[#A1A1B5]">Collectors</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}