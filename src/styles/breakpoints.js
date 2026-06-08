export const BREAKPOINT_WIDTHS = Object.freeze({
  mobileMax: 1024,
  desktopMin: 1025,
})

export const BREAKPOINTS = Object.freeze({
  mobile: `${BREAKPOINT_WIDTHS.mobileMax}px`,
  desktop: `${BREAKPOINT_WIDTHS.desktopMin}px`,
})

export const MEDIA_QUERIES = Object.freeze({
  mobilePortrait: `(max-width: ${BREAKPOINTS.mobile}) and (orientation: portrait)`,
  desktopFrame: `(min-width: ${BREAKPOINTS.desktop}), (max-width: ${BREAKPOINTS.mobile}) and (orientation: landscape)`,
})
