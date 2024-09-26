import { getUserData } from '@/actions/get-user-data'
import { getCurrentWorkspaceData, getUserWorkSpaceData } from '@/actions/workspace'
import Sidebar from '@/components/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'
import { Workspace as UserWorkspace } from '@/types/app';
import InfoSection from '@/components/info-section'
import Typography from '@/components/typography'
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels'
import NoDataScreen from '@/components/no-data-component'
async function Workspace({ params: { workspaceId } }: {
    params: {
        workspaceId: string
    }
}) {


    const userData = await getUserData()
    if (!userData) return redirect('/auth');



    const [userWorkspaceData, userWorkspaceError] = await getUserWorkSpaceData(userData.workspaces!)
    const [currentWorkspaceData, currentWorkspaceError] = await getCurrentWorkspaceData(workspaceId)

    const userWorkspaceChannels = await getUserWorkspaceChannels(currentWorkspaceData.id, userData.id)
    return (
        <>
            <div className='hidden md:block'>
                <Sidebar
                    currentWorkspaceData={currentWorkspaceData}
                    userData={userData}
                    userWorksapcesData={userWorkspaceData as UserWorkspace[]}

                />
                <InfoSection
                    currentWorkspaceData={currentWorkspaceData}
                    userData={userData}
                    userWorkspaceChannels={userWorkspaceChannels}
                    currentChannelId=''
                />
                <NoDataScreen
                    workspaceName={currentWorkspaceData.name}
                    userId={userData.id}
                    workspaceId={currentWorkspaceData.id}
                />
            </div>

            <div className='md:hidden block min-h-screen'>
                Mobile
            </div>
        </>

    )
}

export default Workspace
