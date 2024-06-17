import * as React from "react";
import Header from "../organisms/header";

export interface HomeTemplateProps {
  children: React.ReactNode;
}

export default function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <div className="min-h-[100vh] max-w-[1300px] mx-auto px-8 relative flex flex-col gap-4">
      <Header />
      {children}
    </div>
  );
}
