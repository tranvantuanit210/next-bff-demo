import * as React from "react";

export interface HomeTemplateProps {
  children: React.ReactNode;
}

export default function HomeTemplate({ children }: HomeTemplateProps) {
  return <div className="min-h-[100vh] mt-10 max-w-[1300px] mx-auto px-8">{children}</div>;
}
