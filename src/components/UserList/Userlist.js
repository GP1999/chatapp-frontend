const { useState, useEffect } = require("react");
const { useHistory } = require("react-router-dom");
const {API_URL}=require('../../config.json');


function UserList() {
const [friendsList,setFriendsList]=useState({});
const [searchEmail,setSearchEmail]=useState('');
const history=useHistory();

useEffect(()=>{
    const id=localStorage.getItem('userId');
    const url=API_URL+`friendslist?id=${id}`;
    fetch(url).then((res)=>{
        if(res.status===200)
        return res.json();
    }).then((data)=>{
        console.log(data);


    }).catch((err)=>{
        console.log(err);
    })
},[])
function formateData(data){
    let newData={};
    for(let i=0;i<data.length;i++){
        newData[data[i]._id]={
            name:data[i].name,
            email:data[i].email,
        }
    }
    setFriendsList(newData);
}
function getUserListJSX(){
    const friendsListKeys=Object.keys(friendsList);
   return friendsListKeys.map((id)=>{

        return (
              <div className='User' onClick={(id)=>handleClickOnUser(id)}>
                  <h5>{friendsList[id].name}</h5>
                  <h6>{friendsList[id].email}</h6>
              </div>
        )
    })
}
function handleClickOnUser(id){
    console.log("clcked on user "+id);
    history.push({
        pathname:'/chatroom',
        state:{
            userId:id,
            name:friendsList[id].name,
            email:friendsList[id].email
        }
    })
    


}

return(
    <div className="UserListContainer">
        {/*User Search code*/}
        <div>
            <input type='email' value={searchEmail} placeholder='Enter Email id of user'></input>      
        </div>
        <div className="UserList">
            {
                getUserListJSX()
            }
        </div>

    </div>
)

}