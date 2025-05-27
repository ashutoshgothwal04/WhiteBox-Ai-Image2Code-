"use client"
import { supabase } from '@/configs/supabaseClient';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useEffect, useState } from 'react'

interface AuthContextType {
    user: any | null;
}

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        // Set initial user
        supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    )
}

// Custom hook to use auth
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default Provider

