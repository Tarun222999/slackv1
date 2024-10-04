
import { User } from '@/types/app';
import React, { FC } from 'react'
import Typography from './typography';

import { IoMdHeadset } from 'react-icons/io';
type ChatHeaderProp = { title: string; chatId: string; userData: User };

const ChatHeader: FC<ChatHeaderProp> = ({ title, chatId, userData }) => {
    return (
        <div className='absoulte h-10 top-0 left-0 w-full'>
            <div className='h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md'>
                <Typography text={`# ${title}`} variant='h4' />
                <IoMdHeadset
                    className='text-primary cursor-pointer'
                    size={24}
                />
            </div>
        </div>
    )
}

export default ChatHeader