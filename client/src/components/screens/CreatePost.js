import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'

const CretePost = ()=>{
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [video,setVideo] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
               // "Access-Control-Allow-Origin": "*"
            },
            body:JSON.stringify({
                title,
                body,
                url:url,
                
                

            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               navigate('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","introworld")
       data.append("cloud_name","dvgt9sgl7")
        fetch("https://api.cloudinary.com/v1_1/dvgt9sgl7/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }
 

   return(
       <div className="card input-filed"
       style={{
           margin:"60px auto",
           maxWidth:"500px",
           padding:"50px",
           textAlign:"center",
           backgroundColor:"#64485C",
           borderRadius:"20px",
           height:"400px"
       }}
       >
           <input 
           type="text"
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
             placeholder="body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
           <div className="file-field input-field">
            <div className="btn waves-effect waves-light">
                <span>Uplaod</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light"
            onClick={()=>postDetails()}
            
            >
                Post
            </button>

       </div>
   )
}


export default CretePost