
import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import { getCurrentWorkspaceData, getUserWorkSpaceData } from '@/actions/workspace';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'
import { Workspace as UserWorkspace } from '@/types/app';
import Typography from '@/components/typography';
import ChatHeader from '@/components/chat-header';
import TextEditor from '@/components/text-editor';

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

    const currentChannelData = userWorkspaceChannels.find((channel) => channel.id == channelId)

    if (!currentChannelData) return redirect('/');


    return (
        <div className='hidden md:block'>
            <div className='h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2'>
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

                <div className='p-4 relative w-full overflow-hidden'>
                    <ChatHeader title={currentChannelData.name} chatId={''} userData={userData} />
                    <div className='mt-10'>
                        <Typography text='chat content' variant='h1' />
                    </div>
                </div>
            </div>
            <div className='m-4'>
                <TextEditor />
            </div>
        </div>
    )
}

export default ChannelId
