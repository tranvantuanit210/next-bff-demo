import userApis from "@/apis/user.api";
import { UserList } from "@/components/organisms/users/user-list";
import HomeTemplate from "@/components/templates/home-template";

export interface HomePageProps {}

export default async function HomePage() {
  const data = await userApis.getUsers();
  const users = data.data;
  return (
    <HomeTemplate>
      <div className="w-full">{users && <UserList data={users} />}</div>
    </HomeTemplate>
  );
}
