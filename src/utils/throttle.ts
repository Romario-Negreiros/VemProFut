// wait = milliseconds

const throttle = (func: (...args: any[]) => void, wait = 500) => {
  let lastTime = 0;

  return (...args: any[]) => {
    const now = Date.now();

    if (now - lastTime >= wait) {
      func.apply(this, args);
      lastTime = now;
    }
  };
};

export default throttle;
