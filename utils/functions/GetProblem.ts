import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getProblem = async ({ id }: { id: string }) => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/problem/${id}`, {
        method: "GET",
        headers: { Cookie: cookieHeader },
        cache: "no-store",
    });

    if (res.status === 401) {
        return redirect("/auth/login");
    }

    const data = await res.json();
    return data.problem;
};
