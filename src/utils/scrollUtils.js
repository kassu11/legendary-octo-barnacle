// Scroll position that puts the element right below the sticky main navigation. Missing elements give the top of the page
export function scrollYBelowNavigation(element) {
  if (!element?.isConnected) return 0;
  return Math.max(0, element.getBoundingClientRect().top + window.scrollY - document.querySelector(".main-navigation").offsetHeight);
}
