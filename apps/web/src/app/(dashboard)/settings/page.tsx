import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/auth";
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui";

import { api } from "@/trpc/server";
import { AddOrUpdatePasswordModal } from "./components/add-or-update-password";
import { DeleteAccount } from "./components/delete-account";
import { ProfileSettings } from "./components/profile-settings";

export default async function SettingsPage() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/");
    }
    const data = await api.user.getUserSettingsInfo.query();

    return (
        <React.Fragment>
            <div className="border-b-border border-b px-4">
                <h1 className="pt-[2px] text-[28px] font-semibold">Settings</h1>
            </div>
            <Tabs className="container" defaultValue="account">
                <TabsList className="-mx-4 my-1">
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="w-full space-y-4 md:w-2/3">
                    <div className="relative -left-3 -top-1 space-y-4">
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold">Profile</h1>
                            <Separator />
                        </div>
                        <ProfileSettings user={session.user} />
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold">Security</h1>
                            <Separator />
                        </div>
                        <AddOrUpdatePasswordModal hasPassword={data.hasPassword} />
                        <DeleteAccount user={session.user} />
                    </div>
                </TabsContent>
            </Tabs>
        </React.Fragment>
    );
}
