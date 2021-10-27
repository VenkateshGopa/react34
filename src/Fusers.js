import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const Users = () => {
  const [state, setstate] = useState({ userId: "1", title: "", body: "" });
  const [users, setusers] = useState([]);
  const [posts, setposts] = useState([]);
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
  async function deletedata(id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const post = posts.filter((post) => post.id !== id);
      setposts(post);
    } catch (err) {
      console.error(err);
    }
  }
  function editpost(post) {
    setstate({ ...post });
  }
  async function update() {
    try {
      const { id, userId, title, body } = state;
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { userId, title, body }
      );
      console.log(data);
      const post = [...posts];
      const index = post.findIndex((post) => post.id === id);
      post[index] = data;
      setposts(post);
    } catch (err) {
      console.error(err);
    }
  }
  async function create() {
    try {
      const { userId, title, body } = state;
      const { data } = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        { userId, title, body }
      );
      const post = [...posts, data];
      setposts(post);
    } catch (err) {
      console.error(err);
    }
  }

  function submithandler(event) {
    event.preventDefault();
    console.log(state);
    if (state.id) update();
    else create();
    setstate({ userId: "1", title: "", body: "" });
  }
  const changehandle = ({ target: { name, value } }) => {
    setstate({ ...state, [name]: value });
  };
  return (
    <div className=" py-2">
      {/* <div className="row "> */}
        <div className="col-8 col-sm-4 col-lg-3 mx-2 p-4 rounded">
          <label> User </label>
          <select className="form-control form-control-sm form-select"value={state.userId}onChange={changehandle} name="userId">
            {users.map((ele) => (
              <option key={ele.id} value={ele.id}>
                {ele.name}
              </option>
            ))}
          </select>
          <label> Title </label>
          <input className="form-control form-control-sm" name="title" value={state.title} onChange={changehandle} />
          <label> Body </label>
          <input className="form-control form-control-sm" name="body" value={state.body}onChange={changehandle}/>
          <br/>
          <button className=" btn btn-primary" onClick={submithandler}>Submit</button>
        </div>
      {/* </div> */}

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletedata(post.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => editpost(post)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
