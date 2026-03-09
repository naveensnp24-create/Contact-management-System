import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const handleLogin = async () => {
    try {
      const response = await userAPI.login(email, password);
      localStorage.setItem('userEmail', email);
      toast.success('Login successful!');
      navigate('/contact');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };
  
  const handleSignUp = async () => {
    try {
      await userAPI.signup(email, password, name);
      toast.success('Registration successful! Please login.');
      // switch back to login mode
      setIsSignUp(false);
      setName('');
    } catch (error) {
      toast.error('Registration failed. Email might already exist.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-800 px-4">
      <div className="w-full max-w-md flex flex-col rounded-xl bg-slate-400 p-6">
        <h2 className="font-bold text-2xl text-center mb-6">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <div className="flex flex-col space-y-4">
          {isSignUp && <div className="flex flex-col font-bold">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder=" Enter your Name" 
              className="bg-white rounded-lg py-2 m-2" value={name}
              onChange={e => setName(e.target.value)} />
          </div>}
          <div className="flex flex-col font-bold">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder=" Enter your Mail" 
              className="bg-white rounded-lg py-2 m-2" value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col font-bold">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder=" Enter your Password" 
              className="bg-white rounded-lg py-2 m-2" value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="bg-blue-800 py-2 rounded-lg hover:scale-105 mx-2 mt-15 hover:bg-blue-400 transition-all duration-1000 text-white" 
            onClick={isSignUp ? handleSignUp : handleLogin}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          <p className="text-center mt-4 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
            <span className="text-blue-800 cursor-pointer hover:underline ml-1" 
              onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;