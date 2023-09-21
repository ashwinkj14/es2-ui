import logo from '../es2-logo-final.jpg'
import '../styles/login.css';

function doLogin(){
    const username = document.getElementById("login-username").value;
    if(username === ""){
        console.log("username is required");
    }
    const password = document.getElementById("login-password").value;
    if(password === ""){
        console.log("password is required");
    }
    const userType = document.getElementById("login-usertype").value;
    if(userType === ""){
        console.log("select usertype");
    }
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
                    <option disabled value="">usertype</option>
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