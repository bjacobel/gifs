export const isGifVisible = (gifs, index) => {
  let gifScrollTop = 0;

  for (let i = 0; i < index; i++) {
    gifScrollTop += gifs[i].observedHeight + 5;  // 5 for padding
  }

  const gifScrollBottom = gifScrollTop + gifs[index].observedHeight;

  const windowScrollTop = window.scrollY;
  const windowScrollBottom = windowScrollTop + window.innerHeight;

  if (Math.max(windowScrollTop, gifScrollTop) <= Math.min(windowScrollBottom, gifScrollBottom)) {
    return true;
  } // else
  return false;
};