/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as commits from "../commits.js";
import type * as drafts from "../drafts.js";
import type * as github from "../github.js";
import type * as http from "../http.js";
import type * as polar from "../polar.js";
import type * as repos from "../repos.js";
import type * as scans from "../scans.js";
import type * as twitter from "../twitter.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  commits: typeof commits;
  drafts: typeof drafts;
  github: typeof github;
  http: typeof http;
  polar: typeof polar;
  repos: typeof repos;
  scans: typeof scans;
  twitter: typeof twitter;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
