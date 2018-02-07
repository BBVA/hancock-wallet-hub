declare module 'express-jsonschema' {
  export function validate(...args: any[]): (...args: any[]) => any;
}