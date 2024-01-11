import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// fonction indispensable pour le bon fonctionnement de shadcn/ui
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
