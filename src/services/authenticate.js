import {API_URL} from '../config.json';

async function isUserLogedIn(){
const token=localStorage.getItem('token');

if(token){
    const url=API_URL+"user/authenticate";

  const response=await fetch(url,{

        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({token:token})
    })
    console.log(response);
    if(response.status===200)
    return true;
    else
    return false;
}else{
    return false;
}

}

export default isUserLogedIn;