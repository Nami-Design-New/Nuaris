export function checkIsItemActive(item, currentRoute) {
  let isActive = false;
  if (item?.submenu) {
    item.submenu?.forEach((item) => {
      if (item.path === currentRoute) {
        isActive = true;
      }
    });
  }
  return isActive;
}