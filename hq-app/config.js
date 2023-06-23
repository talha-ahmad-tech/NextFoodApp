export function env(key = '') {
  if (!key.length) {
    throw new Error('No env key provided');
  }

  if (typeof window !== "undefined" && window.__env) {
    return window.__env[key] === "''" ? '' : window.__env[key];
  }

  return process.env[key] === "''" ? '' : process.env[key];
}