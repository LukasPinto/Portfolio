import { useState, useEffect, useRef } from "react";

const defaultOptions = {
  root: null, // El viewport del documento es el elemento raíz que se observa
  rootMargin: "0px 0px -20% 0px",
  threshold: 0, // El callback se ejecuta tan pronto como el elemento entra/sale del rootMargin.
};

//este hook se encarga de quedar observando la pantalla/viewport para detectar cuando entra o sale un titulo
function useActiveSection(
  sectionIds: string[],
  forceState: string | null,
  options?: IntersectionObserverInit
): string | null {
  const [activeId, setActiveId] = useState<string | null>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      return;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (forceState !== "") {
      setActiveId(forceState as string | null);
      return;
    }
    const observerOptions: IntersectionObserverInit = {
      ...defaultOptions,
      ...options,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        const sortedVisibleEntries = visibleEntries.sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        setActiveId(sortedVisibleEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        if (observerRef.current) {
          observerRef.current.observe(element);
        }
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, options?.rootMargin, options?.threshold, options?.root]);

  return activeId;
}

export default useActiveSection;
