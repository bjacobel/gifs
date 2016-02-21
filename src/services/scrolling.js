const inView = (scrollTop, scrollHeight) => {
  const scrollBottom = scrollTop + scrollHeight;
  const windowTop = window.scrollY;
  const windowBottom = windowTop + window.innerHeight;

  return (windowTop <= scrollTop <= windowBottom) || (windowTop <= scrollBottom <= windowBottom);
};

export default inView;
