"use client"
import { supabase } from '@/configs/supabaseClient';
import React from 'react'

function Authentication({ children }: any) {
    const onButtonPress = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div onClick={onButtonPress}>
                {children}
            </div>
        </div>
    )
}

export default Authentication