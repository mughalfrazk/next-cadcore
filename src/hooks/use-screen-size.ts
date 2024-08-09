import { useMediaQuery } from '@mantine/hooks';

export const useScreenSize = () => {
  const isMobile = useMediaQuery('(max-width: 480px)') // 30rem
  const isTablet = useMediaQuery('(max-width: 768px)') // 48rem
  const isDesktop = useMediaQuery('(min-width: 1024px)') // 64rem
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)') // 90rem
  const isXLDesktop = useMediaQuery('(min-width: 1888px)') // 118rem
  const isXXLDesktop = useMediaQuery('(min-width: 2368px)') // 148rem
  const isXXXLDesktop = useMediaQuery('(min-width: 2624px)') // 164rem
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isXLDesktop,
    isXXLDesktop,
    isXXXLDesktop,
  }
}