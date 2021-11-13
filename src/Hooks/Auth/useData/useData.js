import { useEffect, useState } from "react"

const useData =()=>{
    const [data,setData]=useState([]);

    useEffect(()=>{
        fetch('https://fast-sea-90623.herokuapp.com/cars')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[])

    return [data,setData];
}

export default useData ;