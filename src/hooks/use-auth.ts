"use client";

import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient();

export function useAuth() {
  const session = authClient.useSession();

  return {
    user: session.data?.user ?? null,
    session: session.data?.session ?? null,
    isLoading: session.isPending,
    signOut: () => authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login"; } } }),
  };
}
