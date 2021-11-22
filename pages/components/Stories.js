import React,{useState,useEffect} from 'react';
import faker from "faker";
import Story from './Story';
import {useSession} from 'next-auth/react'


const Stories = () => {

    const [suggestions,setSuggestions] = useState([])
    const {data : session} = useSession()

    useEffect(() => {
        const suggestions = [...Array(20)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        })
        )
        setSuggestions(suggestions);
    }, [])

    return (
        <div className="flex p-6 -ml-16 bg-white space-x-2 mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
            {session && (
                <Story img={session.user.image} username={session.user.username}/>
            )}

            {suggestions.map(profile => {
                return (
                    <Story key={profile.id} img={profile.avatar} username={profile.username} />
                )
            })}
        </div>
    )
}

export default Stories
