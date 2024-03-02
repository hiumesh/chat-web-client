import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Chat() {
  const session = await getServerSession(authOptions);

  if (session?.user)
    return (
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={25}>
          <div className="p-3">One</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="p-3">Two</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );

  redirect("/signin");
}
