import * as React from "react";
import { redirect } from "next/navigation";

export default async function Home() {
    return redirect("/login");
}
