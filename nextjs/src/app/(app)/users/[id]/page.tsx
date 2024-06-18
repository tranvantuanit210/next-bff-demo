import { toPascalCase } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/molecules/card";
import userApis from "@/services/user.service";
import Link from "next/link";
import { User } from "@/types/user.type";

export interface UserDetailsProps {
  params: {
    id: string;
  };
}

export default async function UserDetails({ params: { id } }: UserDetailsProps) {
  const data = await userApis.getUserDetails(id);
  const user = data.data;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {Object.keys(user).map((key, index) => (
              <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{toPascalCase(key)}</p>
                  {key === "isActive" ? (
                    <p className="text-sm text-muted-foreground">{user[key as keyof User] ? "Active" : "Unactive"}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">{user[key as keyof User]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full">Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
