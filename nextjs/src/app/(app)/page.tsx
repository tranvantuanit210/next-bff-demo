import { UserList } from "@/components/organisms/users/user-list";
import HomeTemplate from "@/components/templates/home-template";
import { cookies } from "next/headers";
import userBffServices from "./users/services/user.bff.service";

export interface HomePageProps {}

export default async function HomePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const data = await userBffServices.getUsers(accessToken, { page: 1, pageSize: 10 });
  const users = data.data.items;
  return (
    <HomeTemplate>
      <div className="w-full">{users && <UserList data={users} />}</div>
    </HomeTemplate>
  );
}
