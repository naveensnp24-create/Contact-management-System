import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { authAPI } from '../services/api';




const LoginForm=()=>{
    const [username,setuserName]=useState('');
    const [password,setPassword]=useState('');
    const [role,setRole]=useState('user');
    const [isRegister,setIsRegister]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState('');
    const navigate= useNavigate()
    
    const handleNameChange=(e)=>{
        setuserName(e.target.value)
    }
    
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const handleRoleChange=(e)=>{
        setRole(e.target.value)
    }
    
    const handleConfirmPasswordChange=(e)=>{
        setConfirmPassword(e.target.value)
    }
    
  
    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        console.log('Form data:', { email: username, password, role });
        
        if (isRegister) {
            if (password !== confirmPassword) {
                toast.error("Passwords don't match!");
                return;
            }
            try {
                const {data} = await authAPI.register({
                    email:username,
                    password:password,
                    role:role
                });
                toast.success(data.message);
                setIsRegister(false);
            } catch (error) {
                toast.error(error.response?.data?.message || "Registration failed");
            }
        } else {
            try {
                console.log('Sending login data:', { email: username, password });
                const {data} = await authAPI.login({
                    email:username,
                    password:password
                });
                toast.success(data.message);
                sessionStorage.setItem("token",data.token);
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('role', data.role);
                sessionStorage.setItem('userEmail', username);
                
                navigate('/');
            } catch (error) {
                toast.error(error.response?.data?.error || "Login failed");
            }
        }
    }


    console.log(username)
    console.log(password)
    return(
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-slate-900 shadow-2xl rounded-2xl p-8 border border-slate-700">    
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <h1 className="text-center text-3xl font-bold text-white mb-6">{isRegister ? 'REGISTER' : 'LOGIN'}</h1>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input type="email" id="email" name="E-MAIL" placeholder="Enter email" value={username} className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleNameChange}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input type="password" id="pass" name="PASSWORD" placeholder="Enter password" value={password} className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handlePasswordChange}/>
                    </div>
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                            <input type="password" placeholder="Confirm password" value={confirmPassword} className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleConfirmPasswordChange}/>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                        <select value={role} className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleRoleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg mt-6">{isRegister ? 'Register' : 'Login'}</button>
                    <p className="text-center text-slate-400 mt-4">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-blue-400 hover:text-blue-300 ml-2 font-medium">
                            {isRegister ? 'Login here' : 'Register here'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default LoginForm;