export const isGifVisible = (gifs, index) => {
  let gifScrollTop = 0;

  for (let i = 0; i < index; i++) {
    gifScrollTop += gifs[i].observedHeight;
  }

  const gifScrollBottom = gifScrollTop + gifs[index].observedHeight;

  const windowScrollTop = window.scrollY - window.innerHeight;
  const windowScrollBottom = windowScrollTop + window.innerHeight * 2;

  if (Math.max(windowScrollTop, gifScrollTop) <= Math.min(windowScrollBottom, gifScrollBottom)) {
    return true;
  } // else
  return false;
};
