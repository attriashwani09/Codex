import { createAsyncThunk , createSlice } from "@reduxjs/toolkit" ;
import axiosClient from "../utils/axiosClient"; 


// Register User 
export const registerUser = createAsyncThunk(
    "auth/register" , 

    async ( userData , { rejectWithValue } ) => { 
        try{
            const response = await axiosClient.post("/user/register" , userData ) ;
            return response.data.user ;
        }
        catch( error ){
            return rejectWithValue( error.response?.data ) ;
        }
    }
)  


// Login User 
export const loginUser = createAsyncThunk(
    "auth/login" , 

    async ( credentials , {rejectWithValue}) => {
        try{
            const response = await axiosClient.post("/user/login" , credentials ) ;
            return response.data.user ;
        } 
        catch( error ){
            return rejectWithValue( error.response?.data ) ;
        }
    }
)


// Check Authentication  
export const checkAuth = createAsyncThunk(
    "auth/check" ,
    
    async ( _ , { rejectWithValue} ) => { 

        try{
            const response = await axiosClient.get("/user/check" ) ;
            return response.data.user ; 
        } 
        catch( error ){
            return rejectWithValue( error.response?.data ) ;
        }
    } 
    
)


// Logout User  
export const logoutUser = createAsyncThunk(
    "auth/logout" , 
    async ( _ , { rejectWithValue }) => {
        try{ 

            await axiosClient.post("/user/logout") ;
            return null ;

        } 
        catch( error ){
            return rejectWithValue( error.response?.data ) ;
        }
    }
)



const authSlice = createSlice({
    name : "auth" , 

    initialState : {
        user : null , 
        loading : false ,
        isAuthenticated : false , 
        error : null 
    }, 

    reducers : {} ,

    extraReducers : (builder) => {

        builder 

        // Register User Cases
        .addCase( registerUser.pending , ( state ) => {
            state.loading = true ;
            state.error = null ;
        }) 

        .addCase( registerUser.fulfilled , ( state , action) => {
            state.loading = false ; 
            state.isAuthenticated = !!action.payload ;
            state.user = action.payload ;
        }) 

        .addCase( registerUser.rejected , ( state , action) => {
            state.loading = false ;
            state.error = action.payload || "Something went wrong" ;
            state.user = null ;
            state.isAuthenticated = false ;
        })  


        // Login User Cases 
        .addCase( loginUser.pending , (state) => {
            state.loading = true ;
            state.error = null ;
        }) 

        .addCase( loginUser.fulfilled , ( state , action ) => {
            state.loading = false ;
            state.isAuthenticated = !!action.payload ;
            state.user = action.payload ;
        })  

        .addCase( loginUser.rejected , ( state , action ) => {
            state.loading = false ;
            state.error = action.payload || "Something went wrong" ;
            state.isAuthenticated = false ;
            state.user = null ;
        })


        // Check Authentication Cases : 
        .addCase( checkAuth.pending , (state) => {
            state.loading = true ;
            state.error = null ;
        }) 

        .addCase( checkAuth.fulfilled , ( state , action) => {
            state.loading = false ;
            state.isAuthenticated = !!action.payload ;
            state.user = action.payload ;
        }) 

        .addCase( checkAuth.rejected , ( state , action) => {
            state.loading = false ;
            state.error = action.payload || "Something went wrong" ;
            state.isAuthenticated = false ;
            state.user = null ;
        }) 


        // logout User Cases : 
        .addCase( logoutUser.pending , (state) => {
            state.loading = true ;
            state.error = null ;
        }) 

        .addCase( logoutUser.fulfilled , (state ) => {
            state.loading = false ; 
            state.isAuthenticated = false ;
            state.user = null ;
            state.error = null ;
        }) 

        .addCase( logoutUser.rejected , ( state , action) => {
            state.loading = false ;
            state.user = null ;
            state.isAuthenticated = false ;
            state.error = action.payload || "Something went wrong" ;
        })


    }
}) 



export default authSlice.reducer ;