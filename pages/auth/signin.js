import React from 'react';
import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Navbar from '../components/Navbar';

const signIn = ({ providers }) => {
    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center  min-h-screen py-2 -mt-56 px-14 text-center">
                <img
                    className="w-80"
                    alt="instagram-icon"
                    src="https://www.dafont.com/forum/attach/orig/6/1/615469.png?1"></img>
                <p className="font-xs italic">This is not a REAL APP. it is built for educational purposes only with the help of Sonny Sangha YT channel. </p>

                <div className="mt-40 ">

                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="p-3 bg-blue-400 rounded-lg text-white"
                                onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        },
    };
}

export default signIn
