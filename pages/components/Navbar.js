import React from 'react';
import { 
    SearchIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    UserGroupIcon,
    PlusCircleIcon,
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid"
import {useSession, signOut, signIn} from "next-auth/react"
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom'

const Navbar = () => {
    const {data : session} = useSession();
    const router = useRouter();
    const [open,setOpen] = useRecoilState(modalState);

    return (
        <nav className="max-w-screen-xl shadow-sm border-b bg-white sticky top-0 z-50 mx-auto  items-center">
            <div className="nav__wrapper flex justify-between items-center">

                <div onClick={() => router.push("/")} className="nav__logo">
                    <img className="w-24 h-24" 
                    src="https://cdn.worldvectorlogo.com/logos/instagram-1.svg" 
                    layout="fill" 
                    objectfit="contain"
                    alt="logo"/>
                </div>

                <div className="search__bar relative border-gray-500 flex items-center h-9">
                    <div className="absolute inset-y-0 pl-3 flex items-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="text" className="bg-gray-50 h-full w-full pl-10 rounded-md sm:text-sm border-gray focus:ring-black focus:border-black" placeholder="Search..."></input>
                </div>

                <div className="flex items-center space-x-3 ">
                
                {/* Home Icon */}
                    <svg onClick={() => router.push("/")} xmlns="http://www.w3.org/2000/svg" className="navBtn" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                {session ? (
                    <>
                    {/* Paper Airplane Icon */}
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="navBtn rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <div className="absolute -top-1 -right-2 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center animate-pulse text-white ">
                            7
                        </div>
                    </div>
                    {/* Plus Circle Icon */}
                        <svg onClick={() => setOpen(true)} xmlns="http://www.w3.org/2000/svg" className="navBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    {/* Inbox Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="navBtn" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                        </svg>
                    {/* User Group Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="navBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    {/* Heart Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="navBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
    
                    {/* Profile Picture */}    
                        <img 
                        onClick={signOut}
                        src={session.user.image}
                        alt="Profile Picture"
                        className="w-12 h-12 rounded-full cursor-pointer"
                        />
                    </>
                        
                        ) :(
                            <button
                            className="pr-5"
                            onClick={signIn}>Sign In</button>
                            ) }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
