import { useMantineTheme } from '@mantine/core'

/// Reference src/styles/goodwinTheme.ts for clarity on where these values originate
export const useZIndex = () => {
  const goodwinTheme = useMantineTheme()
  return {
    hide: goodwinTheme.other.zIndices.hide,
    auto: goodwinTheme.other.zIndices.auto,
    base: goodwinTheme.other.zIndices.base,
    baseOverlay: goodwinTheme.other.zIndices.baseOverlay,
    docked: goodwinTheme.other.zIndices.docked,
    dropdown: goodwinTheme.other.zIndices.dropdown,
    sticky: goodwinTheme.other.zIndices.sticky,
    banner: goodwinTheme.other.zIndices.banner,
    overlay: goodwinTheme.other.zIndices.overlay,
    modal: goodwinTheme.other.zIndices.modal,
    popover: goodwinTheme.other.zIndices.popover,
    skipLink: goodwinTheme.other.zIndices.skipLink,
    toast: goodwinTheme.other.zIndices.toast,
    tooltip: goodwinTheme.other.zIndices.tooltip,
    navOverlay: goodwinTheme.other.zIndices.navOverlay,
    nav: goodwinTheme.other.zIndices.nav,
  }
}
