const getIconSize = (size: string) => {
  let sizePx = 0;

  switch (size) {
    case 'small': {
      sizePx = 16;
      break;
    }
    case 'medium': {
      sizePx = 20;
      break;
    }
    case 'large': {
      sizePx = 24;
      break;
    }
    default: {
      sizePx = 20;
      break;
    }
  }

  return sizePx;
};

export default getIconSize;
