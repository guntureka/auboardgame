"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { getCookie, setCookie } from "cookies-next";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const cookies = getCookie("theme");
  useEffect(() => {
    if (cookies) {
      setIsChecked(true);
    }

    setCookie("theme", isChecked);
  }, []);

  if (isChecked) {
    setTheme("dark");
    setCookie("theme", isChecked);
  } else if (!isChecked) {
    setTheme("light");
    setCookie("theme", isChecked);
  }

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={() => setIsChecked(!isChecked)}
    />
  );
};
export default ThemeToggle;
