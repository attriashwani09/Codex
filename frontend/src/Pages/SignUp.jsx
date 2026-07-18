import {useForm } from "react-hook-form" ;

function SignUp(){

    const { register,  handleSubmit,  formState: { errors }, } = useForm();  

    return(
        <>
        <form onSubmit={ handleSubmit( (data) => console.log( data )) }  className = "flex flex-col justify-center items-center bg-amber-400" > 
            <input   {...register('firstName')}  placeholder="Enter Your name "></input> 
            <input type="email"  {...register('email')}  placeholder="Enter your Email Id"  ></input>
            <input type="password"  {...register('password')}   placeholder="Password" ></input> 

            <button type="submit"  className="btn">SignUp</button>
        </form>
        </>
    )
}




export default SignUp ; 



// const SignUp = () =>{

// const [ firstName , setName ] = useState("") ;
//     const [ email , setEmail ] = useState("") ;
//     const [ password , setPassword ] = useState("") ;

//     const HandleSubmit = ( e ) => {
//        e.preventDefault() ; 

//       // use Validation validation
//      // connect to backend and perform operation on Db 

//         console.log( firstName , email , password ) ;
        
//     }

//     return(
//         <>
//         <form action=""  onSubmit={ HandleSubmit }  className = "flex flex-col justify-center items-center bg-amber-400"> 

//             <input type="text" value={firstName}  placeholder="Enter your firstName"  onChange={ (e) => setName( e.target.value ) }></input>   
//             <input type="email" value={email}  placeholder="Enter your Email Id"  onChange={ (e) => setEmail( e.target.value ) }></input>    
//             <input type="password" value={password}  placeholder="Enter your Password"  onChange={ (e) => setPassword( e.target.value ) }></input>      

//             <button type="submit" className="btn">Sign Up</button>
//         </form>    
//         </>
//     ) 

// }
