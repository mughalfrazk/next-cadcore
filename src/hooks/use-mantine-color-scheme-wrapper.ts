"use client"

import { useEffect, useState } from "react";
import { useMantineColorScheme as useMantineColorSchemeCore } from "@mantine/core";

/**
 * This hook is just a wrapper on top of `useMantineColorSchemeCore` to update the 
 * theme after the client component is loaded and to avoid `Hydration failed because the initial UI`.
 * 
 * https://stackoverflow.com/a/74580510/13229626
 *  */

export const useMantineColorScheme = () => {
  const theme = useMantineColorSchemeCore()
  const [colorScheme, setColorScheme] = useState<string>("")

  useEffect(() => {
    setColorScheme(theme.colorScheme)
  }, [theme.colorScheme])

  const lightDark = (light: string, dark: string): string => {
    const d = dark ?? light
    const l = light ?? dark

    return colorScheme === "dark" ? d : l
  }

  return { colorScheme, toggleColorScheme: theme.toggleColorScheme, lightDark }
}