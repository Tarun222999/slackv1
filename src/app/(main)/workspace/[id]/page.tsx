import { getUserData } from '@/actions/get-user-data'
import { getCurrentWorkspaceData, getUserWorkSpaceData } from '@/actions/workspace'
import Sidebar from '@/components/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
import { Workspace as UserWorkspace } from '@/types/app';
async function Workspace({ params: { id } }: {
    params: {
        id: string
    }
}) {
    console.log(id)

    const userData = await getUserData()
    if (!userData) return redirect('/auth');



    const [userWorkspaceData, userWorkspaceError] = await getUserWorkSpaceData(userData.workspaces)
    const [currentWorkspaceData, currentWorkspaceError] = await getCurrentWorkspaceData(id)

    return (
        <>
            <div className='hidden md:block'>
                <Sidebar
                    currentWorkspaceData={currentWorkspaceData}
                    userData={userData}
                    userWorkspacesData={userWorkspaceData as unknown as UserWorkspace[]}

                />
            </div>

            <div className='md:hidden block min-h-screen'>
                Mobile
            </div>
        </>

    )
}

export default Workspace
