"use client";
import { useEffect, useState } from "react";
import styles from "./circularProgress.module.css";

export default function CircularProgress({ percentage = 98, size = 80 }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = percentage / (duration / 16);

    const animate = setInterval(() => {
      start += increment;

      if (start >= percentage) {
        start = percentage;
        clearInterval(animate);
      }

      // update number
      setDisplayValue(Math.floor(start));

      // update circle stroke
      const progressOffset =
        circumference - (start / 100) * circumference;

      setOffset(progressOffset);
    }, 16);

    return () => clearInterval(animate);
  }, [percentage, circumference]);

  return (
    <div
      className={styles.container}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.progressSvg}
        width={size}
        height={size}
      >
        <circle
          className={styles.bg}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={styles.progress}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.text}>{displayValue}%</div>
    </div>
  );
}
