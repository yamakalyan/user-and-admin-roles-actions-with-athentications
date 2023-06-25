import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthenticationContext = createContext()

 export const Authentication = ({children})=> {
    const [admin, setAdmin] = useState(false)
    const [Customer, setCustomer] = useState(false)

    const roleKey = localStorage.getItem("role")

    const navigator = useNavigate()

    useEffect(()=>{
        if (roleKey === null || undefined) {
            localStorage.removeItem("role")
            navigator('/')

        } else {
            const fetchingAuth = async()=>{

                const options = {
                    method : "get",
                    headers : {"Content-type" :"application/json", "role" : roleKey}
                }
                await fetch("http://localhost:3200/user/auth", options)
                .then(res =>res.json())
                .then(data =>{
                    if (data.success) {
                        if (data.results[0].user_id === "admin") {
                            setAdmin(true)
                        } else if(data.results[0].user_id === "customer1"){
                            setCustomer(true)
                         }else if(data.results[0].user_id === "customer2"){
                            setCustomer(true)
                         }else{
                            setAdmin(false)
                            setCustomer(false)
                         }
                    } else {
                        setAdmin(data.success)
                        setCustomer(data.success)
                    }
                })
           }
           return ()=> fetchingAuth()
        }
        
    },[])

  return <AuthenticationContext.Provider value={{ admin, Customer}}>{children}</AuthenticationContext.Provider>
}

export const Auth =()=>{
    return useContext(AuthenticationContext)
}
