import React from "react"
const ContextData = React.createContext({
    users:[],
    posts:[],
    updateUser: user =>{},
    updatePosts: post =>{}
});
export default ContextData;