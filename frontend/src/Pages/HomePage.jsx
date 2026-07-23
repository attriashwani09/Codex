import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../store/authSlice" ;
import { NavLink } from "react-router-dom" ;

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState( {
        difficulty: "all",
        tag: "all",
        status: "all",
      });

  // Fetch Problems and SolvedProblems from backend
  useEffect(() => {
    async function fetchProblems() {
      try {
        const { data } = await axiosClient.get("/problem/getAllProblem");
        setProblems(data);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    }

    async function fetchSolvedProblems() {
      try {
        const { data } = await axiosClient.get( "/problem/ProblemSolvedByUser/user" );
        setSolvedProblems(data);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    }

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);


  // Handle logout feature : 
  const handleLogout = ()=>{
    dispatch( logoutUser() ) ;
    setSolvedProblems([]) ; 
  }  


  console.log("User:", user);
  console.log("Role:", user?.role);


  // Filter Problems : 
  const filteredProblems = problems.filter( (problem) => {
    const difficulityMatch = filters.difficulty === 'all'  || problem.difficulty === filters.difficulty ;
    const tagMatch = filters.tag == 'all' || problem.tags.includes( filters.tag ) ; 
    const  isSolved = solvedProblems.some( (sp) => problem._id === sp._id ) ;  
    const statusMatch = filters.status === 'all' || ( filters.status == 'solved' && isSolved ) ;

    return difficulityMatch && tagMatch && statusMatch ;    
  }) 


   return(
    <div  id="homepage"  className="min-h-screen  bg-base-300 text-base-content" >
        {/* Navbar */}
        <nav id="navbar"  className="flex items-center justify-between px-[13%] p-4 bg-base-100 text-xl text-center">
            <div className="text-blue-600 font-bold text-2xl">
                <NavLink to="/" > Codexa </NavLink>
            </div> 

            <div  className="flex gap-8 text-center items-center">
               <span className="font-medium"> Hi, {user?.firstName} </span>  

               <div className="flex flex-row gap-8">
                    { user.role === 'admin'  && (<NavLink to = "/admin" className="px-3 py-[6px] border-blue-600 border-2 text-blue-600 rounded-2xl text-center"> Admin Panel </NavLink>)}

                    <button onClick={handleLogout}  className="px-3 py-[6px bg-red-600 text-white border-2 border-white rounded-2xl flex - items-center justify-center" > Logout </button> 
               </div>
               
            </div>  
        </nav> 

        

        {/* Main Content */}
        <div  className="px-[13%] my-4"> 
            {/* Filters  */}
            <div className="flex flex-row gap-10">  {/* For Status */}
                <select onChange={  (e) => setFilters({...filters , status : e.target.value })}  className="bg-base-100 p-3 px-4 border-white border-1 rounded-xl"> 

                    <option value="all"  > All Problems </option>
                    <option value="solved"> Solved Problems </option>

                </select>  

                {/* For Difficulty */}
                <select  onChange={ (e) => setFilters( { ... filters , difficulty : e.target.value } )}  className="bg-base-100 p-3 px-4 border-white border-1 rounded-2xl">
                    
                    <option value="all">All Difficulty</option>
                    <option value="easy" >Easy</option> 
                    <option value="medium" > Medium </option>
                    <option value="hard" > Hard </option>    
                </select>  


                {/* For tag */} 
                <select onChange={ (e) => setFilters({ ... filters , tag : e.target.value })}  className="bg-base-100 p-3 px-4 border-white border-1 rounded-2xl">

                    <option value="all" >All tags </option>
                    <option value="array" > Array </option>
                    <option value="linkedlist" > Linked List </option>
                    <option value="graph" > Graph </option>
                    <option value="dp" > DP </option>
                    <option value="tree" > Tree </option>
                    <option value="sorting" > Sorting </option>
                    <option value="math" > Math </option>

                </select>


            </div>
        </div>
        
    </div>
  )

}


export default Homepage ;
