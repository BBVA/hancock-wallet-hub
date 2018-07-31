declare module 'express-jsonschema' {
  export function validate(...args: any[]): (...args: any[]) => any;
  interface JsonSchemaValidation {
    value: any;
    property: string;
    messages: string[];
  }
  export interface JsonSchemaError extends Error {
    validations: {
      body: JsonSchemaValidation[];
    }
  }
}

declare module 'node-forge';