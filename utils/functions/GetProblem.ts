// src/utils/functions/getProblems.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Problem } from "../types/userInterface";

export const getProblem = async ({ id }: { id: string }) => {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/problem/${id}`, {
        method: "GET",
        headers: { Cookie: cookieHeader, },
        cache: "no-store",
    });

    console.log("Fetch response status:", res.status);
    if (res.status === 401) {
        console.log("Fetch response status:", res.status);
        return redirect("/auth/login");
    }


    if (!res.ok) {
        throw new Error("Failed to fetch problems");
    }

    const data = await res.json();
    const problem: Problem = data.problem
    return problem;

};
