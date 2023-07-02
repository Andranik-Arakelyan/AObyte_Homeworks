//AJAX FUNCTION

function ajax(url, config) {
  return new CustomPromise(function (resolve, reject) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(config.type || "GET", url);
      for (let header in config.headers) {
        if (config.headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, config.headers[header]);
        }
      }
      xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = function () {
        reject(new Error("Network error"));
      };
      try {
        xhr.send(JSON.stringify(config.data));
      } catch (error) {
        console.log("Error occurred while sending request:", error);
        reject(error);
      }
    } catch (error) {
      console.log("hello this is my error.");
    }
  });
}

//  CUSTOM PROMISE

function CustomPromise(callback) {
  this.value = null;
  this.error = null;
  this.onResolve = [];
  this.onReject = [];
  this.onFinally = null;
  this.state = "pending";

  let resolve = (value) => {
    if (this.state === "pending") {
      this.state = "resolved";
      this.value = value;
      this.onResolve.forEach((callback) => callback(value));
      if (this.onFinally) {
        this.onFinally();
      }
    }
  };

  let reject = (error) => {
    if (this.state === "pending") {
      this.state = "rejected";
      this.error = error;
      this.onReject.forEach((callback) => callback(error));
      if (this.onFinally) {
        this.onFinally();
      }
    }
  };

  try {
    callback(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

CustomPromise.prototype.then = function (onResolve, onReject) {
  const nextPromise = new CustomPromise((resolve, reject) => {
    const resolveHandler = (value) => {
      try {
        const result = onResolve ? onResolve(value) : value;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    const rejectHandler = (error) => {
      try {
        //   const result = onReject ? onReject(error) : error;
        //   resolve(result);

        //changed to

        if (onReject) {
          const result = onReject(error);
          resolve(result);
        } else {
          reject(error);
        }
      } catch (err) {
        reject(err);
      }
    };

    this.onResolve.push(resolveHandler);
    this.onReject.push(rejectHandler);
  });

  return nextPromise;
};

CustomPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject);
};

CustomPromise.all = function (promises) {
  return new CustomPromise(function (resolve, reject) {
    const results = [];
    let completedPromises = 0;
    const numPromises = promises.length;

    if (numPromises === 0) {
      resolve(results);
    } else {
      promises.forEach(function (promise, index) {
        promise
          .then(function (value) {
            results[index] = value;
            completedPromises++;

            if (completedPromises === numPromises) {
              resolve(results);
            }
          })
          .catch(function (error) {
            //results[index] = { status: "rejected", reason: error };
            // if (completedPromises === numPromises) {
            //   resolve(results);
            // } else {
            //   reject(results[index].reason);
            // }

            //changed to

            reject(error);
          });
      });
    }
  });
};

CustomPromise.prototype.finally = function (onFinally) {
  this.onFinally = onFinally;
  return this;
};

// TESTING

const url = "https://api.thecatapi.com/v1/categories";

const config = {
  type: "GET",
  headers: {},
  data: {},
};

const p1 = ajax(url + "ll", config);
const p2 = ajax(url, config);
const p3 = ajax(url, config);

p1.then((res) => {
  console.log("p1 response:", res);
}).catch((error) => {
  console.log("this is an error in p1.", error);
});

p2.then((res) => {
  console.log("p2 res:", res);
  return "Some message.";
})
  .then((res) => {
    console.log("second then p2 res:", res);
    return 120;
  })
  .catch((error) => {
    console.log("this is an error in p2.", error);
  });

p3.catch((error) => {
  console.log("this is an error in p3.", error);
})
  .then((res) => {
    console.log("p3 res:", res);
    return JSON.parse(res);
  })
  .then((res) => {
    console.log("p3 res: second then:", res);
  });

const allPromises = CustomPromise.all([p1, p2, p3]);
allPromises
  .catch((error) => {
    console.log("this is an error in All.", error);
  })
  .then((res) => {
    console.log("allPromises res:", res);
    return "Everything is alright!";
  })
  .then((res) => {
    console.log(res);
  });

// BAGS

// const p4 = new CustomPromise((res, rej) => {
//   setTimeout(() => res("TEST"), 1000); // This code works
// });

// p4.then((res) => console.log(res));

// ///////

// const p5 = new CustomPromise((res, rej) => {
//   res("TEST"); // This doesn't work
// });

// p4.then((res) => console.log(res));

//////////
