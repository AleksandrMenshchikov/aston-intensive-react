export default function makeAsyncOperation(callback: () => unknown) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        const result = callback();
        res(result);
      } catch (err) {
        rej(err);
      }
    }, 0);
  });
}
