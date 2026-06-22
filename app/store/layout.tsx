import { CartProvider } from "@/contexts/CartContext";
import type { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
