import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdMoreVert } from "react-icons/md";

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

const Dropdown = DropdownMenu.Root;

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Trigger asChild {...props} ref={ref}>
    <button className={cn("p-2 focus:outline-none  focus:outline-none ", className)}>
      <MdMoreVert className="text-2xl rounded-full hover:bg-surface-01" />
    </button>
  </DropdownMenu.Trigger>
));
DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>>(
  ({ className, children, ...props }, ref) => (
    <DropdownMenu.Content {...props} ref={ref} className={cn("bg-white shadow-md rounded-md py-1", className)}>
      {children}
    </DropdownMenu.Content>
  )
);
DropdownContent.displayName = "DropdownContent";

const DropdownItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <DropdownMenu.Item
    {...props}
    ref={ref}
    className={cn(
      "flex group py-3 px-4 text-base focus:outline-none cursor-pointer gap-2 hover:bg-surface-01 items-center",
      className
    )}
  >
    {children}
  </DropdownMenu.Item>
));
DropdownItem.displayName = "DropdownItem";

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
