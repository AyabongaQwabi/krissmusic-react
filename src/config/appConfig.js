
export const VERSION = process.env.CI_VERSION || 'not-set-s';
export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';
export const ENV = process.env.NODE_ENV || 'development';
export const WEB_SITE_BASE = process.env.WEB_SITE_BASE || 'http://localhost:3000';

export const IS_DEV =
  ENV !== 'production' &&
  ENV !== 'qa';

export default {
  VERSION,
  HOSTNAME,
  PORT,
  ENV,
  IS_DEV,
  WEB_SITE_BASE,
};
