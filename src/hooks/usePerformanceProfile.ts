import { useEffect, useState } from "react";

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

const getPerformanceProfile = () => {
  if (typeof window === "undefined") {
    return {
      lowPerformance: false,
      ultraLowPerformance: false,
    };
  }

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const connection = (navigator as Navigator & { connection?: NavigatorConnection }).connection;

  const saveData = connection?.saveData === true;
  const slowNetwork = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
  const lowMemory = typeof memory === "number" && memory <= 4;
  const veryLowMemory = typeof memory === "number" && memory <= 2;
  const lowCpu = typeof cores === "number" && cores <= 4;
  const veryLowCpu = typeof cores === "number" && cores <= 2;
  const smallScreen = window.matchMedia("(max-width: 768px)").matches;

  const ultraLowPerformance =
    saveData ||
    slowNetwork ||
    veryLowMemory ||
    veryLowCpu ||
    (smallScreen && (lowMemory || lowCpu));

  const lowPerformance =
    ultraLowPerformance ||
    lowMemory ||
    lowCpu ||
    (smallScreen && !window.matchMedia("(prefers-reduced-motion: no-preference)").matches);

  return {
    lowPerformance,
    ultraLowPerformance,
  };
};

export const usePerformanceProfile = () => {
  const [profile, setProfile] = useState(getPerformanceProfile);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 768px)");

    const update = () => setProfile(getPerformanceProfile());

    reducedMotionQuery.addEventListener?.("change", update);
    widthQuery.addEventListener?.("change", update);
    window.addEventListener("resize", update, { passive: true });

    update();

    return () => {
      reducedMotionQuery.removeEventListener?.("change", update);
      widthQuery.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return profile;
};

