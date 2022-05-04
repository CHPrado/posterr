export function disablePageScroll(modalOpen: boolean) {
  document.documentElement.style.overflow = modalOpen
    ? "hidden"
    : "auto scroll";
  document.documentElement.style.overscrollBehaviorY = modalOpen
    ? "none"
    : "none";
}
