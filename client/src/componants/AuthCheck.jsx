import { useNavigate } from "react-router-dom"
import { Auth } from "./Authentication"

export const AuthCheckCustomer =({children})=> {
    const auth = Auth()
    const navigator = useNavigate()
  return (
     auth.Customer ? children : navigator('/no-auth')
  )
}

export const AuthCheckAdmin =({children})=> {
    const auth = Auth()
    const navigator = useNavigate()
  return (
     auth.admin ? children : navigator('/no-auth')
  )
}
