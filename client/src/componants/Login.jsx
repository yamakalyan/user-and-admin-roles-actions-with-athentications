import { useState } from "react"
import {useNavigate } from "react-router-dom"

export default function Login() {
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const navigator = useNavigate()

    const handleLogin =(e)=>{
        e.preventDefault()

        const fetchingLogin = async()=>{
            
            const options = {
                method : "post",
                headers : {"content-Type" : "application/json"},
                body : JSON.stringify({
                    user_id : userName,
                    user_password : userPassword
                })
            }
            await fetch("http://localhost:3200/user/login", options)
            .then(res =>res.json())
            .then(data =>{
                if (data.success) {
                    localStorage.setItem("role", data.results[0].user_id)
                    navigator("/data")
                    window.location.reload(false)
                } else {
                    localStorage.removeItem("roleKey")
                }
            })
        }

        fetchingLogin()
    }

  return (
    <div className="container">
    <div className="row border border-2 p-4">
      <div className="col-md col-lg">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label  className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e)=>setUserPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}
