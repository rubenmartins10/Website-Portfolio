'use client'
import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);
  return <Component />;
}
