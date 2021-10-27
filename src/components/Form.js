import React, { useContext, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextData from "../Store/context";
import { useHistory} from "react-router";
import classes from './form.module.css';

const Form = ({update , create , post=null }) => {
  const data = useContext(ContextData);
  const [state, setstate] = useState({ userId: "1", title: "", body: "" });
  const [blur, setblur] = useState({title: false, body:false});
  const history = useHistory();

  useEffect(() =>{
    if(post) setstate({...post})
  }, [post])

  const titlev = state.title.trim().length >= 10;
  const bodyv = state.body.trim().length >= 20;
  const titlevalid = (!titlev && blur.title);
  const bodyvalid = (!bodyv && blur.body);


  const changehandle = ({ target: { name, value } }) => {
    setstate({ ...state, [name]: value });
  };
  

  const blurHandler = ({ target: { name } })=>{
    setblur({ ...blur, [name]: true });
  }

  function submithandler(event) {
    event.preventDefault();
    if(titlev && bodyv)
    {
    if (state.id) update(state);
    else create(state);
    setstate({ userId: "1", title: "", body: "" });
    setblur({title: false, body:false, titlevalid:false, bodyvalid:false});
    history.push('/post');
    }
    else
    window.alert('fill out all details correctly');
  }
  // console.log(titlev,bodyv)
  // console.log(titlevalid , bodyvalid)
  return (
    <div className={classes.form}>
        <form className={`col-8 col-sm-4 col-lg-3 mx-2 p-4 rounded bg-white`} onSubmit={submithandler}>
          <p>Add your Post </p>
          <i className={classes.des}>fill out the below details to add the post</i>
          <label> User </label>
          <select className="form-control form-control-sm form-select"value={state.userId} onChange={changehandle} name="userId">
            {data.users.map((ele) => (<option key={ele.id} value={ele.id}>{ele.name}</option>))}
          </select>
          <label> Title </label>
          <input className="form-control form-control-sm" name="title" value={state.title} onChange={changehandle} onBlur={blurHandler} />
          {titlevalid? <i className={classes.err}>Title should contain 10 characters</i>: '' }
          <label> Body </label>
          <input className="form-control form-control-sm" name="body"  value={state.body} onChange={changehandle} onBlur={blurHandler} />
          { bodyvalid? <i className={classes.err}>Body should contain atleast 20 characters</i> : ''}
          <button className=" btn btn-primary">Submit</button>
        </form>
    </div>
  );
};
export default Form;
