const scaleVariant = {
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
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const chatVariant = {
  hide: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3, delay: 0.2 },
  },
};

const messagesVariant = {
  hidden: {
    flex: 0,
  },
  animate: {
    flex: 1,
    transition: { duration: 0.6, delay: 0.6 },
  },
  exit: {
    flex: 0,
    transition: { duration: 0.6 },
  },
};

const messageItemVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { opacity: { duration: .5 } } },
};

const memberVariant = {
  hide: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: {
    opacity: { duration: .2 },
    height: { duration: .4 }
  }

}

export { scaleVariant, chatVariant, messagesVariant, messageItemVariant, memberVariant };

