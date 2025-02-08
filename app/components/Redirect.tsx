"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserRole } from "./userrole"; // Adjust this path based on your file structure

export function Redirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const role = await getUserRole(session.user.id);

          if (role === "ADMIN") {
            router.push("/dashboard-Admin");
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Handle error appropriately
        }
      } else if (status === "unauthenticated") {
        router.push("/");
      }
    };

    redirectUser();
  }, [session, status, router]);

  return null;
}
