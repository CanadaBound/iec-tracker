import '../CSS/Navigation.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
function Navigation(){

	let navigate = useNavigate();

	const [toggleDropdown, setToggleDropdown]= useState(false);
	const [username, setUsername]= useState('');
	const [password, setPassword]= useState('');
	const [adminView, setAdminView] = useState(false);

	//When a user tries to login this will trigger. We send a request to the backend with the username and password that the user submitted,
	//the backend will then respond with a status 200 if the values are valid and correct. If that's the case we save the username in local storage,
	//so that it can be displayed for the user once they're logged in and the backend creates a cookie which means you will be remembered as being logged in previously. We reset the values for username and password, and redirect the page to
	//the admin dashboard. setAdminView controls which version of the log in container a user sees. Either log in form or a log out button and other navigation. 
	function handleLogin(e){
		e.preventDefault();

		axios.post('/login', {
			username: username,
			password: password })
		.then(res=>{
			if(res.status === 200){
				localStorage.setItem("username", username);
				setUsername('');
				setPassword('');
				navigate('/Admin', { replace: true });
				window.location.reload();
			}else{
				throw res.error;
			}
			setToggleDropdown(false);
			setAdminView(true);
		})
		.catch(err => {
		alert('Error logging in!');
		});
	}

	//This function handles logging out, it will send a request to the backend which will remove the cookie created on log in, it will also remove
	//the username stored in local storage and redirect you back to the homepage and set the adminView state to false
	//to show the log in form.
	function handleLogout(){
		axios.get('/logout').then(res=>localStorage.removeItem("username")).catch(err=>console.log(err));
		navigate('/', { replace: true });
		setToggleDropdown(false);
		setAdminView(false);
	}

	//This useEffect runs when a person first opens the page and it sends a request to the backend to verify if there is a cookie stored from previous login,
	//and if there is a cookie, if it's still valid. If it is, you will automatically go into Admin mode otherwise you will have to log in again.
	useEffect(()=>{
		axios.get('/auth')
			.then(res=>{
				if(res.status === 200){
					setAdminView(true);
				}else{
					setAdminView(false);
				}
			})
			.catch(err=>{
				setAdminView(false);
			})
	},[]);



return(
	<>
		<header className="Header-Container">
			<nav className="Navigation-Menu">
			
				<button className={toggleDropdown?'Admin-Button-Active':"Admin-Button"} onClick={()=>setToggleDropdown(prev=>!prev)}>
				<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-circle" className="svg-inline--fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill='#cccccc' d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>
				</button>
				{adminView?<div className={toggleDropdown?'Username-Container-Active':'Username-Container'}>
				
				<p className='Username-Text'>Hi, {localStorage.getItem("username")}!</p>
				<div className="Button-Container">
					<button className='Dashboard-Button' onClick={()=>navigate('/Admin', { replace: true })}><img alt='Dashboard' src="https://img.icons8.com/ios/50/000000/web.png"/></button>
					<p>Dashboard</p>
				</div>
				
				<button onClick={(e)=>handleLogout(e)} className='Logout-Button'>Logout</button>

				</div>:<div className={toggleDropdown?'Login-Container-Active':'Login-Container'}>
					<p className='Login-Title'>Admin Login</p>
					<form className='Login-Form'>
						<input type='text' value = {username} onChange={(e)=>setUsername(e.currentTarget.value)}className='Username' placeholder='Username..'/>
						<input type='password' value = {password} onChange={(e)=>setPassword(e.currentTarget.value)} className='Password' placeholder='Password..'/>
						<button onClick={(e)=>handleLogin(e)} className='Redirect'>Login</button>
									
					</form>
				</div>}
			</nav>
			<div className="Title-Container">
				<h1 className="Title">IEC Tracker</h1>
					<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="-2015 -2000 4030 4030">
						<path fill="#f00" d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"/>
					</svg>
			</div>
			
		</header>
	</>
);

}

export default Navigation;