'use client'
import { redirect } from "next/navigation";

export const getProblem = async (id: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/problem/${id}`, {
        method: "GET",
        credentials: "include",
        next: {
            revalidate: 10
        }
    });

    if (res.status === 401) {
        return redirect("/auth/login");
    }

    const data = await res.json();
    return data.problem;
};
