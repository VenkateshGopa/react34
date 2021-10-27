import React, { Component } from "react";
import axios from "axios";
class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
      userId: "1",
      title:"",
      body:""
    };
  }
  async fetchdata() {
    try{
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({users: data });
    }catch(err){
      console.error(err);
    }
  }
  async getdata() {
    try{
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
    this.setState({posts: data });
    } catch(err){
      console.error(err);
    }
  }
  delete = async (id) =>{
    try{
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const posts = this.state.posts.filter((post) =>post.id !== id);
    this.setState({posts});
    } catch (err){
      console.error(err);
    }
  };
  editpost = (post) =>{
    this.setState({...post});
  }
  update =  async () =>{
    try{
    const { id , userId ,title, body} = this.state;
      const {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        userId,title,body});
        console.log(data);
      const posts = [...this.state.posts];
      const index = this.state.posts.findIndex((post) => post.id === id);
      posts[index] = data;
      this.setState({posts,userId:"", title:"", body:""});
      } catch (err){
        console.error(err);
      }
  };
  create = async () =>{
    try{
      const {userId ,title, body} = this.state;
      const {data} = await axios.post(`https://jsonplaceholder.typicode.com/posts`,{
        userId,title,body});
      const posts = [...this.state.posts , data];
      this.setState({posts,userId:"", title:"", body:""});
      } catch (err){
        console.error(err);
      }
  };
  componentDidMount() {
    this.fetchdata();
    this.getdata();
  }
  submithandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    if(this.state.id)
    this.update();
    else
    this.create();
  };
  changehandle = ({target:{name , value}}) => {
    this.setState({[name]: value });
  };
  render() {
    return (
      <div>
        <label> User </label>
        <select value={this.state.userId} onChange={this.changehandle} name="userId">
          {this.state.users.map((ele) => (<option key={ele.id} value={ele.id}>{ele.name}</option>))}
        </select>
        <br/>
        <br/>
        <label> Title </label>
        <input name="title" value={this.state.title} onChange={this.changehandle}/>
        <br/>
        <br/>
        <label> Body </label>
        <input name="body" value={this.state.body} onChange={this.changehandle}/>
        <br/>
        <br/>
        <button onClick={this.submithandler}>Submit</button>
        <br/>
        <br/>
        <table>
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
            {this.state.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td><button onClick={() => this.delete(post.id)}>Delete</button>
                  <button onClick={() => this.editpost(post)}>Edit</button></td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Users;
