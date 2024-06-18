import userApis from "@/services/user.service";
import { UserList } from "@/components/organisms/users/user-list";
import HomeTemplate from "@/components/templates/home-template";

export interface HomePageProps {}

export default async function HomePage() {
  const data = await userApis.getUsers({ page: 1, pageSize: 10 });
  const users = data.data.items;
  return (
    <HomeTemplate>
      <div className="w-full">{users && <UserList data={users} />}</div>
    </HomeTemplate>
  );
}
