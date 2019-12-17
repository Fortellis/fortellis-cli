declare function stringify(
  value: any,
  replacer?: (key: string, value: any) => any,
  space?: string | number
): string;

declare namespace stringify {
  export function stable(
    value: any,
    replacer?: (key: string, value: any) => any,
    space?: string | number
  ): string;

  export function stableStringify(
    value: any,
    replacer?: (key: string, value: any) => any,
    space?: string | number
  ): string;

  export function decycle(
    value: any,
    replacer?: (
      value: any,
      key: string,
      stack: [any, any][],
      parent?: any
    ) => any | void
  ): any;
}

export default stringify;
