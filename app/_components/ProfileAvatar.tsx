"use client"
import { supabase } from '@/configs/supabaseClient';
import Image from 'next/image';
import React from 'react'
import { useAuthContext } from '../provider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ProfileAvatar() {

    const user = useAuthContext();
    const router = useRouter();
    const onButtonPress = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            router.replace('/')
        }
    }
    return (
        <div>
            <Popover >
                <PopoverTrigger>
                    {user?.user?.user_metadata?.avatar_url && <img src={user?.user?.user_metadata?.avatar_url} alt='profile' className='w-[35px] h-[35px] rounded-full' />}
                </PopoverTrigger>
                <PopoverContent className='w-[250px] mx-w-sm p-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{user?.user?.user_metadata?.full_name}</span>
                            <span className='text-sm text-gray-500'>{user?.user?.email}</span>
                        </div>
                        <Button variant={'ghost'} onClick={onButtonPress} className='justify-start px-2'>Logout</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileAvatar