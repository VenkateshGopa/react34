import { useEffect, useState } from "react";
import ContextData from "./context";
import axios from "axios";
const Provider = (props) =>{
    const [posts , setposts] = useState([]);
    const [users , setusers] = useState([]);
    useEffect(() => {
        async function fetchdata() {
          try {
            const { data } = await axios.get(
              "https://jsonplaceholder.typicode.com/users"
            );
            setusers(data);
          } catch (err) {
            console.error(err);
          }
        }
        async function getdata() {
          try {
            const { data } = await axios.get(
              "https://jsonplaceholder.typicode.com/posts"
            );
            setposts(data);
          } catch (err) {
            console.error(err);
          }
        }
        fetchdata();
        getdata();
      }, []);
      const updateUsersHandler = () =>{

      };

      const updatePostsHandler = (posts) =>{
        setposts(posts);
      };

      const Contaxtdat = {
          users:users,
          posts:posts,
          updateUser: updateUsersHandler,
          updatePosts:updatePostsHandler
      };

    return(
        <ContextData.Provider value={Contaxtdat}>
            {props.children}
        </ContextData.Provider>
    )
}

export default Provider;