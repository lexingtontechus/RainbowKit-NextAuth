import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";
import MoonIcon from "./iconmoon";
import SunIcon from "./iconsun";

export default function Mode() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <Switch
      color="#db2777"
      bordered
      iconOn={<MoonIcon filled />}
      iconOff={<SunIcon filled />}
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
    />
  );
}
