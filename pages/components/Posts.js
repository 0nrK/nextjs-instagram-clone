import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { useState,useEffect } from 'react'
import { db } from '../../firebase';
import Post from './Post';

const posts = [{
    id: "1",
    userName: "AntonyCh",
    userImage: "https://pbs.twimg.com/profile_images/1422145129989746689/RNRRbkKS_400x400.jpg",
    postImg:"https://source.unsplash.com/random",
    caption:"Instagram React-Next Clone"
},
];  
const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        const unsubscribe = onSnapshot(query(collection(db, "posts"),
        orderBy("timestamp","desc")),snapshot =>{
            setPosts(snapshot.docs)
        });

        return unsubscribe;
        
    },[db])

    return (
       <div className="w-full h-full">
           {posts.map(post => (
               <Post
               key={post.id}
               id={post.id}
               userName={post.data().username}
               userImage={post.data().profileImg}
               postImage={post.data().image}
               caption={post.data().caption} 
               />
           ))}
       </div> 
    )
}

export default Posts
