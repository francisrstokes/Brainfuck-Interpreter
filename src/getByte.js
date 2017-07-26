process.stdin.setRawMode(true);
module.exports = () =>
  new Promise((resolve, reject) =>
    process.stdin.once('data', (data) => resolve(new Int8Array(data)[0]))
  );