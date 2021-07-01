import {useState, useEffect} from 'react';
import {API_URL} from '../../config.json';
import './Login.css';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // A function to handle input changes
    function handleInputChanges(event) {
        event.preventDefault();
       
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }
    // handle click  and Enter pressing event
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email,password);
        if(email!==''&&password!==''){   
              
        const url = API_URL + "user/login";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                email: email,
                password: password
            })
        }).then((response)=>{

            return response.json();

        }).then((data)=>{

            if(data.err){

                alert(data.err);
            }else{
                //store the user details in local storage for future use
                localStorage.setItem('token',data.token);
                localStorage.setItem('userId',data.userId);
                localStorage.setItem('user_name',data.name);
                setEmail(null);
                setPassword(null);
                console.log(data);
            }
        })
    }else{
        
        alert("Enter Email and password correctly");
    }
    }

    return(

        <div>
            <form onSubmit={handleSubmit}>
                <input type='email' name='email' value={email} onChange={handleInputChanges} placeholder="Enter Email Id"></input>
                <input type="password" name='password' value={password} onChange={handleInputChanges} placeholder="Enter Password"></input>
                <input type="submit" value="submit"></input>
            </form>
        </div>
    )

}

export default Login;
