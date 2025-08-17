export const clickOutClose = (
  node: HTMLElement,
  { cb, toggle }: { cb: () => void; toggle?: HTMLElement }
) => {
  const onClick = (event: Event) => {
    const target = event.target as HTMLElement;

    if (!toggle) {
      if (node && !node.contains(target) && !event.defaultPrevented) {
        cb();
      }
    } else if (toggle) {
      if (
        node &&
        !node.contains(target) &&
        !event.defaultPrevented &&
        !toggle.contains(target)
      ) {
        cb();
      }
    }
  };

  $effect(() => {
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
    };
  });
};