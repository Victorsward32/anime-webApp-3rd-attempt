import { useEffect, useState } from "react";

 const useDebounce = (value,delay = 500)=>{

    const [debounceValue,setDebounceValue]=useState(value);

    useEffect (()=>{
        const handler = setTimeout (()=>{
            setDebounceValue(value)
        },delay)

        // cleanup when value or delay changes
        return () => clearTimeout(handler)
    },[value,delay])

    return debounceValue;

}

export default useDebounce