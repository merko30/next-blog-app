"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type DropdownContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error("Dropdown components must be used within <Dropdown />");
  return ctx;
};

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useDropdown();
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={twMerge("inline-flex items-center", className)}
    >
      {children}
    </button>
  );
};

export const DropdownMenu = ({
  children,
  align = "right",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) => {
  const { open, setOpen } = useDropdown();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={twMerge(
        "absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg py-1",
        align === "left" ? "left-0" : "right-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DropdownItem = ({
  children,
  onSelect,
  className,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) => {
  const { setOpen } = useDropdown();
  const handle = () => {
    setOpen(false);
    onSelect?.();
  };

  return (
    <button
      type="button"
      onClick={handle}
      className={twMerge(
        "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Dropdown;
