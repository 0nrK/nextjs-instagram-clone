import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import Moment from "react-moment"

const Post = ({ userName, postImage, userImage, caption, id }) => {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() =>
        onSnapshot(
            query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            ),
            snapshot => setComments(snapshot.docs)
        ), [db, id])

    useEffect(() => {
        onSnapshot(
            collection(db, "posts", id, "likes"),
            (snapshot) => setLikes(snapshot.docs)
        )
    }, [db, id])

    useEffect(
        () => {
            setHasLiked(
                likes.findIndex((like) => like.id === session?.user?.uid) !== -1
            )
        }, [likes])

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))

        } else {
            await setDoc(
                doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            })
        }


    }

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }
    console.log(comments)
    return (
        <div className="flex items-center -ml-16 bg-white my-7 border rounded-sm ">
            <div>
                <div className="flex items-center  justify-between">
                    <div className="flex items-center p-5">
                        <img
                            className="rounded-full w-12 h-12 object-contain border p-1 mr-3"
                            src={userImage}
                            alt="post-pp"></img>

                        <span class="flex-1 font-bold">{userName}</span>
                    </div>

                    {/* ... Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </div>
                {/* Post Image */}
                <img
                    className="w-full object-cover"
                    src={postImage}
                    alt="post-image"></img>

                {/* Buttons */}
                {session && (
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4 ">
                            {/* Hearth Icon */}
                            {hasLiked ?
                             <svg onClick={likePost} xmlns="http://www.w3.org/2000/svg" class="postBtn text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                            </svg> 
                                :
                            <svg onClick={likePost} xmlns="http://www.w3.org/2000/svg" className="postBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            }

                            {/* Chat Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="postBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>

                            {/* PaperAirPlane Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="postBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="postBtn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                    </div>

                )}
                {/* Caption */}
                <p className="p-5 truncate">
                    {likes.length > 0 && 
                        <p className="font-bold mb-1">{likes.length} likes</p>
                    }
                    <span className="font-bold mr-1">{userName}</span>
                    {caption}
                </p>

                {/* Comments */}
                {comments.length > 0 && (
                    <div
                        className="ml-10 h-20 
                    scrollbar-thumb-black scrollbar-thin
                     overflow-y-scroll">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="flex items-center space-x-2 mb-3">
                                <img className="h-7 rounded-full"
                                src={comment.data().userImage} alt="" />
                                <p className="text-sm flex-1">
                                    <span 
                                    className="font-bold mr-3">
                                        {comment.data().username}
                                    </span>
                                    {comment.data().comment}
                                </p>

                                <Moment className="pr-5 text-xs" fromNow>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        ))}
                    </div>
                )}

                {/* input box */}
                {session && (
                    <form className="flex items-center p-4">
                        {/* Happy Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            className="flex-1 border-none focus:ring-0 outline-none"
                        ></input>
                        <button
                            type="submit"
                            onClick={sendComment}
                            className="font-semibold 
                          text-blue-400"
                        >
                            Post
                        </button>
                    </form>

                )}
            </div>
        </div>
    )
}

export default Post
