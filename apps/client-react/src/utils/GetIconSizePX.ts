const getIconSize = (size: string) => {
  let sizePx = 0;

  switch (size) {
    case 'small': {
      sizePx = 16;
      break;
    }
    case 'medium': {
      sizePx = 24;
      break;
    }
    case 'large': {
      sizePx = 36;
      break;
    }
    default: {
      sizePx = 24;
      break;
    }
  }

  return sizePx;
};

export default getIconSize;
