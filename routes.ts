/**  
 * Array of routes accessible to the public
 * These routes do not require authentication
 * @type {string[]}
*/
export const publicRoutes = [
  "/"
]

/**  
 * Array of routes used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
*/
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
]

/**  
 * The prefix for the authentication API routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
*/
export const apiAuthPrefix = "/api/auth"


/**  
 * The default redirect route after a user logs in
 * @type {string[]}
*/
export const DEFAULT_LOGIN_REDIRECT = "/settings"