import { useForm } from "react-hook-form" ;
import {Link , useNavigate } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod" ;

import {  z } from "zod" ;
import { useEffect } from "react";
import { loginUser } from "../store/authSlice"; 
import{ useDispatch , useSelector } from "react-redux" ;

const loginSchema = z.object({
  emailId: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required") , 
});


function Login() { 

  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const { isAuthenticated , loading , error } = useSelector( (state) => state.auth ) ;

  const { register, handleSubmit, formState: { errors },} = useForm({ resolver: zodResolver( loginSchema ), }); 

  useEffect( ()=>{
    if( isAuthenticated ){
      navigate("/") ;
    }
  })

  function onSubmit(data) {
    dispatch( loginUser(data)) ;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-primary tracking-wide">
              CODEXA
            </h1>

            <p className="text-base-content/70 mt-2">
              Master Data Structures & Algorithms
            </p>

            <h2 className="text-2xl font-bold mt-6">Welcome Back 👋</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input {...register("emailId")}  type="email"  placeholder="Enter your email"  className="input input-bordered w-full"  />

              {errors.emailId && ( <p className="text-error text-sm mt-1"> {errors.emailId.message}  </p>  )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input {...register("password")}  type="password"  placeholder="Enter password"  className="input input-bordered w-full" />

              {errors.password && ( <p className="text-error text-sm mt-1"> {errors.password.message} </p> )}
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center">
    <Link
      to="/forgot-password"
      className="link link-primary text-sm"
    >
      Forgot Password?
    </Link>
            </div>

            <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-primary font-semibold" >
                    Sign up
                </Link>
            </p>
        </div>
        </div>
      </div>
    </div>
  );
} 



export default Login ;
