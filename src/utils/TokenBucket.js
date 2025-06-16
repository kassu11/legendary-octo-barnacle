export class TokenBucket {
  #buffer = [];
  #intervalTarget = null;
  #timeoutTarget = null;
  #current
  #limit
  #intervalTime
  #fillAmount
  #pool
  #defaultDelay
  #requestQueue = Promise.resolve();
  constructor({ start, limit, interval = 60, fillAmount = 1, pool, defaultDelay = 30 }) {
    this.#current = start;
    this.#limit = limit;
    this.#intervalTime = interval;
    this.#fillAmount = fillAmount;
    this.#defaultDelay = defaultDelay;
    this.#pool = pool;

    this.#start();
  }

  #start() {
    clearInterval(this.#intervalTarget);
    this.#intervalTarget = setInterval(() => this.#interval(), this.#intervalTime * 1000);
  }

  #restart(time) {
    this.#current = 0;
    clearInterval(this.#intervalTarget);
    clearTimeout(this.#timeoutTarget);

    this.#timeoutTarget = setTimeout(() => {
      this.#start();
      this.#interval();
    }, time * 1000);
  }

  #interval() {
    if (this.#pool instanceof TokenBucket) {
      this.#current = Math.min(this.#current + Math.min(this.#fillAmount, this.#pool.#tokens()), this.#limit);
    } else {
      this.#current = Math.min(this.#current + this.#fillAmount, this.#limit);
    }
    const copy = this.#buffer.slice();
    this.#buffer.length = 0;
    copy.forEach(buf => buf());
  }

  #tokens() {
    if (this.#current > 0) {
      return this.#current--;
    }
    return this.#current;
  }

  requestToken() {
    if (this.#current > 0) {
      this.#current--;
      return true;
    }
    return false;
  }

  enqueue(requestFunction) {
    this.#requestQueue = this.#requestQueue.then(requestFunction).catch(err => {
      console.error('Request error:', err);
    });

    return this.#requestQueue;
  }

  getDefaultDelay() {
    return this.#defaultDelay;
  }

  getsNextToken() {
    const { promise, resolve } = Promise.withResolvers();
    this.addToBucket(resolve);
    return promise;
  }

  addToBucket(callback) {
    this.#buffer.push(callback);
  }

  delayBucket(seconds) {
    this.#restart(seconds || this.#defaultDelay);
  }
}
