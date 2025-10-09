import { fetchUser } from "@/lib/server_utils";
import { type TokenPayload } from "@/lib/token";
import { redirect } from "next/dist/client/components/navigation";
import { JSX } from "react";

export function withUser<T extends { user: TokenPayload }>(
    Component: (props: T) => JSX.Element | Promise<JSX.Element>
) {
    return async function WithUserWrapper(props: Omit<T, 'user'>) {
        const user = await fetchUser();

        if (!user) {
            redirect('/login');
        }

        return <Component {...(props as T)} user={user} />;
    };
}
