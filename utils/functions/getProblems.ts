"use client"
import { redirect } from "next/navigation";
import { Problem } from "../types/types";

export const getProblems = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/problems`, {
        method: "GET",
        credentials: 'include',
        cache: "force-cache",
        next: { revalidate: 10 },
    });

    if (res.status === 401) {
        console.log("Fetching /api/problems failed with 401");
        return redirect("/auth/login");
    }

    // Handle other errors
    if (!res.ok) {
        throw new Error("Failed to fetch problems");
    }

    // Parse response
    const data = await res.json();
    console.log("Fetched problems:", data);

    const problems: Problem[] = data.problems;
    return problems;
};
