import Logout from "./log-out";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <div className="flex items-center justify-between h-24 border-b">
      <h1 className="uppercase text-2xl font-bold">Demo BFF App</h1>
      <Logout />
    </div>
  );
}
