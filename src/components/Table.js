import { useContext  } from "react";
import { Link } from "react-router-dom";
import ContextData from "../Store/context";
import classes from './Table.module.css';
const Table =  ({editpost ,deletedata }) =>{
    const data = useContext(ContextData);
    return(
        <table className={` ${classes.table} table table-striped table-danger w-100`}>
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
          {data.posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td className='text-center'>
                  <button className="btn btn-danger btn-sm mb-3" onClick={() => deletedata(post.id)}>
                  <i className="far fa-trash-alt"></i>
                  </button>
                  <Link to='/form' className="btn btn-primary btn-sm" onClick={() =>editpost(post)} >
                  <i className="fas fa-pen"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default Table;