"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName: _activeClassName, pendingClassName: _pendingClassName, to, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={to}
        className={cn(className)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
