import { useState, useEffect } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

export default function AnimatedNumber({ value, duration = 3 }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [value, duration, mv]);

  return <span className="calculated-age text-electric-violet">{display}</span>;
}
