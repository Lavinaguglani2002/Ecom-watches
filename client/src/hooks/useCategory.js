import { useState,useEffect } from "react";
import axios from "axios"
export default function useCategory(){
    const [categories,setCategories]=useState([])
    //get cart
    const getCategories=async()=>{
        try {
            const {data}=await axios.get('https://ecom-watches-3.onrender.com/api/v1/category/get-category')
            setCategories(data?.category)
            

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
getCategories()
    },[])
    return categories;
}