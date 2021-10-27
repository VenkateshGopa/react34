import { NavLink } from "react-router-dom";
import classes from './Nav.module.css';
const Nav = () => {
  return (
    <div className={classes.main}>
      <div className={classes.brand}>
        <p>CRUD OPERATIONS</p>
      </div>
      <div className={classes.link}>
        <NavLink to="/form" activeClassName={classes.active}>Form</NavLink>
        <NavLink to="/posts" activeClassName={classes.active}>Posts</NavLink>
      </div>
    </div>
  );
};

export default Nav;
