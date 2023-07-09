class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.error = undefined;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onResolveCallbacks.forEach((callback) => callback(this.value));
      }
    };

    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.error = error;
        this.onRejectCallbacks.forEach((callback) => callback(this.error));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onResolve, onReject) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          if (typeof onResolve === "function") {
            const result = onResolve(this.value);
            resolve(result);
          } else {
            resolve(this.value);
          }
        } catch (error) {
          reject(error);
        }
      } else if (this.state === "rejected") {
        try {
          if (typeof onReject === "function") {
            const result = onReject(this.error); //
            resolve(result);
          } else {
            reject(this.error);
          }
        } catch (error) {
          reject(error);
        }
      } else if (this.state === "pending") {
        this.onResolveCallbacks.push((value) => {
          try {
            if (typeof onResolve === "function") {
              const result = onResolve(value);
              resolve(result);
            } else {
              resolve(this.value);
            }
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectCallbacks.push((error) => {
          try {
            if (typeof onReject === "function") {
              const result = onReject(error);
              resolve(result);
            } else {
              reject(this.error);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch(onReject) {
    return this.then(null, onReject);
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = new Array(promises.length);
      let fulfilledCount = 0;

      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise
            .then((value) => {
              results[index] = value;
              fulfilledCount++;
              if (fulfilledCount === promises.length) {
                resolve(results);
              }
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          results[index] = promise;
          fulfilledCount++;
          if (fulfilledCount === promises.length) {
            resolve(results);
          }
        }
      });
    });
  }
}

function ajax(url, config = {}) {
  const { type = "GET", headers = {}, data = {} } = config;

  return new MyPromise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url);

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("Network error"));
    };

    xhr.send(data);
  });
}
