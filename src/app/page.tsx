'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHouse } from '@/context/HouseContext';

import Starfield from '@/components/ui/Starfield';
import CustomCursor from '@/components/ui/CustomCursor';
import SparkleEffect from '@/components/ui/SparkleEffect';
import AudioPlayer from '@/components/ui/AudioPlayer';
import IntroScreen from '@/components/intro/IntroScreen';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingCharacter from '@/components/floating/FloatingCharacter';
import StarCollector from '@/components/minigame/StarCollector';

import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

export default function HomePage() {
  const { isEntered, mounted } = useHouse();
  const [activeSection, setActiveSection] = useState('home');
  const [audioAutoPlay, setAudioAutoPlay] = useState(false);

  // Detect active section via IntersectionObserver
  useEffect(() => {
    if (!isEntered) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isEntered]);

  // Sync autoPlay from audio started in IntroScreen
  useEffect(() => {
    if (isEntered) setAudioAutoPlay(true);
  }, [isEntered]);

  // Don't render anything until client is mounted (avoids hydration mismatch)
  if (!mounted) return null;

  return (
    <>
      {/* Client-only effects – safe after mount */}
      <CustomCursor />
      <SparkleEffect />

      {/* Intro Sorting Hat overlay */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div key="intro" initial={false} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <IntroScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main portfolio */}
      <AnimatePresence>
        {isEntered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative min-h-screen"
          >
            <Starfield />
            <Navbar activeSection={activeSection} />
            <StarCollector />
            <FloatingCharacter currentSection={activeSection} />
            <AudioPlayer src="/assets/audio/hedwigs-theme.mp3" autoPlay={audioAutoPlay} />

            <main className="relative z-10">
              <HomeSection />
              <AboutSection />
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <ContactSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
