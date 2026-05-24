'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const TOTAL_STARS = 5;

interface StarContextValue {
  collectedCount: number;
  totalStars: number;
  isUnlocked: boolean;
  collectStar: (id: string) => void;
  collectedIds: Set<string>;
}

const StarContext = createContext<StarContextValue>({
  collectedCount: 0,
  totalStars: TOTAL_STARS,
  isUnlocked: false,
  collectStar: () => {},
  collectedIds: new Set(),
});

export function StarProvider({ children }: { children: React.ReactNode }) {
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());

  const collectStar = useCallback((id: string) => {
    setCollectedIds((prev) => {
      if (prev.has(id)) return prev;
      return new Set([...prev, id]);
    });
  }, []);

  const collectedCount = collectedIds.size;
  const isUnlocked = collectedCount >= TOTAL_STARS;

  return (
    <StarContext.Provider value={{ collectedCount, totalStars: TOTAL_STARS, isUnlocked, collectStar, collectedIds }}>
      {children}
    </StarContext.Provider>
  );
}

export function useStar() {
  return useContext(StarContext);
}
