export const NAV_BUTTON_LAYOUT_DEFAULTS = {
  desktop: {
    width: 96,
    height: 96,
    x: 0,
    y: 0,
  },
  mobile: {
    width: 56,
    height: 56,
    x: 0,
    y: 0,
  },
}

export const resolveNavButtonLayout = (navButton, compact = false) => {
  const defaults = compact
    ? NAV_BUTTON_LAYOUT_DEFAULTS.mobile
    : NAV_BUTTON_LAYOUT_DEFAULTS.desktop
  const overrides = compact ? navButton?.mobile : navButton?.desktop

  return {
    width: overrides?.width ?? defaults.width,
    height: overrides?.height ?? defaults.height,
    x: overrides?.x ?? defaults.x,
    y: overrides?.y ?? defaults.y,
  }
}
