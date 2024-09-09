'use server';

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { error } from "console";
import { updateUserWorkSpace } from "./update-user-workspace";
import { addMemberToWorkspace } from "./add-member-to-workspace";

export const createWorkSpace = async ({ imageUrl, name, slug, invite_code }: {
    imageUrl?: string;
    name: string;
    slug: string;
    invite_code: string;
}) => {

    const supabase = await supabaseServerClient()
    const userData = await getUserData()

    if (!userData) {
        return {
            error: 'no user data'
        }
    }


    const { error, data: workspaceRecord } = await supabase.
        from('workspaces').insert({
            image_url: imageUrl,
            name,
            super_admin: userData.id,
            slug,
            invite_code,
        }).select('*')


    if (error) {
        return { error };
    }


    const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkSpace(userData.id, workspaceRecord[0].id)


    if (updateWorkspaceError) {
        return { error: updateWorkspaceError };
    }

    const [addMemberToWorkspaceData, addMemberToWorkspaceError] =
        await addMemberToWorkspace(userData.id, workspaceRecord[0].id);

    if (addMemberToWorkspaceError) {
        return { error: addMemberToWorkspaceError };
    }
}