import type { SVGProps } from "react";

export function BoxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.2499 3.25977H7.87725C7.0644 3.25977 6.31475 3.69818 5.91623 4.40663L3.56133 8.59287H11.2499V3.25977Z" />
      <path d="M3.25 10.0929V18.5089C3.25 19.7516 4.25736 20.7589 5.5 20.7589H18.5C19.7426 20.7589 20.75 19.7516 20.75 18.5089V10.0929H3.25Z" />
      <path d="M20.4387 8.59287L18.0838 4.40663C17.6852 3.69818 16.9356 3.25977 16.1228 3.25977H12.7499V8.59287H20.4387Z" />
    </svg>
  );
}
