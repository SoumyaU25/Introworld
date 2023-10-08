import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])

   
    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
       <div className="home">
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"5px"}}><Link to={item.postedby._id !== state._id?"/profile/"+item.postedby._id :"/profile"  }>{item.postedby.name}</Link> {item.postedby._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            <div className="card-image">
                                <img src={item.photos}/>
                            </div>
                            <div className="card-content">
                             
                                <h5 style={{color:"rgb(18, 18, 41)"}}>{item.title}</h5>
                                <h6>{item.body}</h6>
                                <p><i className="material-icons" style={{fontSize:"2rem"}} >comment</i>{item.comments.length} comments</p>


                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500",color:"rgb(18, 18, 41)"}}>{record.postedby.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
          
       </div>
   )
}


export default Home