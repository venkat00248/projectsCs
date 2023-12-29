import React, { useRef, useLayoutEffect, memo } from "react";
import { useTranslation } from "react-i18next";
export const LiveTime: React.FC = memo(() => {
  const clockRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      if (clockRef.current) {
        const now = new Date();
        const month = now.toLocaleString("default", { month: "long" });
        const day = now.toLocaleString("default", { day: "numeric" });
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? "pm" : "am";
        const formattedTime = `${day} ${t(month)} ${year}, ${
          hours % 12 || 12
        }:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")} ${ampm}`;
        clockRef.current.innerText = formattedTime;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <button className="btn btn-info time"><div ref={clockRef}></div></button>;
});
