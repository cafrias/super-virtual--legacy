export default class WeakPasswordError extends Error {
  constructor(password: string) {
    super(`Password "${password}" is too weak`);
  }
}
