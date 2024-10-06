import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>User Layout</h1>
      {children}
    </div>
  );
}
