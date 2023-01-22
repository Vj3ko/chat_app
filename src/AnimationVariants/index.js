const loginVariant = {
  hide: {
    y: "-100vh",
  },
  show: {
    y: 0,
    transition: {
      type: "spring",
      mass: 0.6,
      damping: 10,
      duration: 1,
      delay: 0.3,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const spinnerVariant = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const chatVariant = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: "-100vh",
    transition: { duration: 0.3 },
  },
};

const messagesVariant = {
  hidden: {
    flex: 0,
  },
  animate: {
    flex: 1,
    transition: { duration: 0.6 },
  },
};

export { loginVariant, spinnerVariant, chatVariant, messagesVariant };
