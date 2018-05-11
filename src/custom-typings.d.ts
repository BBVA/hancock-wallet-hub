declare module 'express-jsonschema' {
  export function validate(...args: any[]): (...args: any[]) => any;
}

declare module 'node-forge' {
  export function validate(...args: any[]): (...args: any[]) => any;
}