import { getUserData } from "@/actions/get-user-data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData()


  if (!userData) {
    return redirect("/auth")
  }

  const userWorkspaceId = userData?.workspaces?.[0]


  if (!userWorkspaceId) {
    return redirect('/create-workspace')
  }


  if (userWorkspaceId) {
    return redirect(`/workspace/${userWorkspaceId}`)
  }

  return (
    <>
      <Button>Click me</Button>
    </>
  );
}
