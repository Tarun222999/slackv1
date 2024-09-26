import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import { getCurrentWorkspaceData, getUserWorkSpaceData } from '@/actions/workspace';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'
import { Workspace as UserWorkspace } from '@/types/app';
import Typography from '@/components/typography';

const ChannelId = async ({
    params: { channelId, workspaceId },
}: {
    params: {
        workspaceId: string;
        channelId: string;
    };
}) => {

    const userData = await getUserData();

    if (!userData) return redirect('/auth');


    const [userWorkspaceData] = await getUserWorkSpaceData(userData.workspaces!);

    const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

    const userWorkspaceChannels = await getUserWorkspaceChannels(
        currentWorkspaceData.id,
        userData.id
    );
    return (
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
                currentChannelId={channelId}
            />
            <div className='p-2'>
                <Typography variant='p' text='channel' />
            </div>
        </div>
    )
}

export default ChannelId
