declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};
}

// Ensure this file is treated as a module
export {};
