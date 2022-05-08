
/* MAIN */

type Options = {
  limit?: number
};

type Request = {
  headers: Record<string, string>,
  method: string,
  body?: any,
  [Symbol.asyncIterator](): AsyncIterator<string>
};

type Response = {
  sendStatus ( code: number ): void
};

type Next = {
 ( error?: unknown ): void
};

/* EXPORT */

export type {Options, Request, Response, Next};
