import logo from '../es2-logo-final.jpg'
import '../styles/login.css';

function doLogin(){
    const username_element = document.getElementById("login-username");
    const username = username_element.value;
    if(username === ""){
        console.log("username is required");
        alert("username is required");
        username_element.focus();
        return false;
    }
    const password_element = document.getElementById("login-password");
    const password = password_element.value;
    if(password === ""){
        console.log("password is required");
        alert("password is required");
        password_element.focus();
        return false;
    }
    const userType_element = document.getElementById("login-usertype");
    const userType = userType_element.value;
    if(userType === ""){
        console.log("select usertype");
        alert("usertype is required");
        userType_element.focus();
        return false;
    }

    const api = `login`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const error_msg = "Error occurred. Unable to login!";
    const data = invokeAPI(api, options, error_msg);
    if(data.result === "success"){
        window.location.href = "/publication";
    }
}

function invokeAPI(api, options, error_msg){
    fetch(api, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(error_msg);
            }
            return response.json();
        })
        .then(data => {
            if (data.result !== "success") {
                throw new Error(error_msg);
            }
            return data;
        })
        .catch(error => {
            console.error(error);
        });
}


function Login(){
    return(
    <div className='login-body'>
      <section className='banner'>
        <div>
          <img src={logo} alt='ES2'/>
        </div>
      </section>
      
      <section className='login-section'>
          <div className='login-container'>
            <div className='login-header'>Publication Repository</div>
            <section className='login-input-container'>
                <input id="login-username" className="login-input" placeholder='username'></input>
                <input id="login-password" className="login-input" type='password' placeholder='password'></input>
                <select id="login-usertype" className="login-input" required name="usertype">
                    <option value="">usertype</option>
                    <option value="admin">admin</option>
                    <option value="member company">member company</option>
                    <option value="student">student</option>
                    <option value="faculty">faculty</option>
                </select>
                <section className='login-btn-container'>
                    <button className='login-btn' onClick={doLogin}>Login</button>
                </section>
            </section>
          </div>
      </section>
    </div>
    );
}

export default Login;