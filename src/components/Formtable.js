import { useContext, useState } from "react";
import axios from "axios";
import Form from './Form';
import Table from "./Table";
import {Route , Switch ,Redirect} from 'react-router-dom';
import ContextData from "../Store/context";
import Nav from "../Navigation/Nav";
const Formtable = () => {
  const [edit , setedit] = useState(null);
  const ctx = useContext(ContextData);

  const reset = () =>{
    setedit(null);
  }
  async function deletedata(id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const post = ctx.posts.filter((post) => post.id !== id);
      ctx.updatePosts(post);
    } catch (err) {
      console.error(err);
    }
  }

  function editpost(post) {
    setedit({...post});
  }

  async function update(state) {
    try {
      const { id, userId, title, body } = state;
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { userId, title, body }
      );
      const post = [...ctx.posts];
      const index = post.findIndex((post) => post.id === id);
      post[index] = data;
      ctx.updatePosts(post);
    } catch (err) {
      console.error(err);
    }
  }

  async function create(state) {
    try {
      const { userId, title, body } = state;
      const { data } = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        { userId, title, body }
      );
      const post = [...ctx.posts, data];
      ctx.updatePosts(post);
    } catch (err) {
      console.error(err);
    }
  }

  return (
      <>
      <Nav/>
      <Switch>
          <Route path='/' exact>
              <Redirect to='/form'/>
          </Route>
          <Route path='/form'>
              <Form update={update} create={create} post={edit} reset={reset}/>
          </Route>
          <Route path='/posts'>
              <Table editpost={editpost} deletedata={deletedata} />
          </Route>
          <Route path='*'>
              <Redirect to='/posts'/>
          </Route>
      </Switch>
      </>
  );
};

export default Formtable;
