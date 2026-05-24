'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { HouseName, HouseConfig, HOUSE_CONFIGS, applyHouseTheme } from '@/lib/houseConfig';

interface HouseContextValue {
  house: HouseName | null;
  houseConfig: HouseConfig | null;
  selectHouse: (h: HouseName) => void;
  isEntered: boolean;
  setIsEntered: (v: boolean) => void;
  mounted: boolean;
}

const HouseContext = createContext<HouseContextValue>({
  house: null,
  houseConfig: null,
  selectHouse: () => {},
  isEntered: false,
  setIsEntered: () => {},
  mounted: false,
});

export function HouseProvider({ children }: { children: React.ReactNode }) {
  const [house, setHouse] = useState<HouseName | null>(null);
  const [isEntered, setIsEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('hp-house') as HouseName | null;
    if (saved && HOUSE_CONFIGS[saved]) {
      setHouse(saved);
      applyHouseTheme(saved);
    }
  }, []);

  function selectHouse(h: HouseName) {
    setHouse(h);
    applyHouseTheme(h);
    localStorage.setItem('hp-house', h);
  }

  const houseConfig = house ? HOUSE_CONFIGS[house] : null;

  return (
    <HouseContext.Provider value={{ house, houseConfig, selectHouse, isEntered, setIsEntered, mounted }}>
      {children}
    </HouseContext.Provider>
  );
}

export function useHouse() {
  return useContext(HouseContext);
}

