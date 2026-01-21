"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type LoaderContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // O "pulo do gato": Desliga o loading automaticamente quando a rota muda
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    stopLoading();
  }, [pathname, searchParams]);

  const startLoading = () => setIsLoading(true);
  // Adiciona um pequeno delay para garantir que a animação seja vista
  const stopLoading = () => setTimeout(() => setIsLoading(false), 6000);

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
