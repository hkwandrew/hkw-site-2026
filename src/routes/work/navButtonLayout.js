export const NAV_BUTTON_LAYOUT_DEFAULTS = {
  width: 96,
  height: 96,
  x: 0,
  y: 0,
}

export const resolveNavButtonLayout = (navButton) => {
  const overrides = navButton?.desktop

  return {
    width: overrides?.width ?? NAV_BUTTON_LAYOUT_DEFAULTS.width,
    height: overrides?.height ?? NAV_BUTTON_LAYOUT_DEFAULTS.height,
    x: overrides?.x ?? NAV_BUTTON_LAYOUT_DEFAULTS.x,
    y: overrides?.y ?? NAV_BUTTON_LAYOUT_DEFAULTS.y,
  }
}
