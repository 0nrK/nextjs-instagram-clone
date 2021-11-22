import React from 'react';
import {signOut, useSession} from 'next-auth/react'

const MiniProfile = () => {

    const {data: session} = useSession();
    
    return (
        <div className="flex justify-between mt-14 ml-10 h-16 items-center">
            <img className="w-16 h-16 rounded-full border p-[2px]"
            src={session?.user?.image}></img>
           
            <div className="flex-1 mx-4">
                <h2 className="font-bold">{session?.user?.username}</h2>
                <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
            </div>

            <button onClick={signOut} 
            className="text-blue-400 text-sm font-semibold">
                Sign Out
            </button>
        </div>
    )
}

export default MiniProfile
