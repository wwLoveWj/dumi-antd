declare module '@testing-library/react';
// declare module 'qs' {
//   export function parse(str: string): { [key: string]: any };
//   export function stringify(obj: { [key: string]: any }): string;
// }
// declare global {
//   interface Window {
//     __COLOR_VARS__: Record<string, string>;
//   }
// }
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
