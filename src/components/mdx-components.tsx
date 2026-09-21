import type { ComponentPropsWithoutRef } from "react";

function SafeLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isSafe =
    isExternal ||
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("./") ||
    href.startsWith("../") ||
    href.startsWith("mailto:");

  if (!isSafe) {
    throw new Error(`Unsafe link protocol in MDX: '${href}'`);
  }

  return (
    <a
      {...props}
      href={href}
      rel={isExternal ? "noreferrer noopener" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: SafeLink,
};
