/**
 * All the public routes that can be accessed without authentication.
 */

export const publicRoutes = ["/", "/faq", "/about", "/contact"];

/**
 * All the routes used for authentication.
 * These routes will redirect logged in users to the / page.
 * @type {string[]}
 */

export const authRoutes = ["/login", "/signup"];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix will be used for api authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
