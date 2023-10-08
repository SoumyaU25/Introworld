import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar = ()=>{
     const {state,dispatch} = useContext(UserContext)
     const navigate = useNavigate()
   
   
    const renderList = ()=>{
       if(state){
           return [
            // <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            <li key="2"><Link to="/profile"><span class="material-icons" style={{fontSize:"2.5rem", margin:"13px",color:"white" }}>
            account_circle
            </span></Link></li>,
            <li key="3"><Link to="/create"><span class="material-icons" style={{fontSize:"2.5rem", margin:"13px" ,color:"white"}}>
            add_box
            </span></Link></li>,
            <li  key="4">
             <button className="btn waves-effect waves-light " style={{ margin:"7px"}}
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              navigate('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
            
           ]
       }else{
         return [
          <li key="5"> <Link to="/signin"  ><span style={{fontSize:"20px"}}> Signin</span></Link></li>,
          <li key="6"> <Link to="/signup"  ><span style={{fontSize:"20px"}}>Signup</span> </Link></li>
          
         
         ]
       }
     }
     return(
        <nav>
        <div className="nav-wrapper ">
          <Link to={state?"/":"/signin"} className="brand-logo left ">Introworld</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
        </nav>
        )
    }
 export default NavBar 