import { useNavigate } from "react-router-dom";
import { Auth } from "./Authentication";

export default function Data() {
  const auth = Auth();
  const navigator = useNavigate();
  if (auth.admin) {
    return navigator('/admin', {replace : true})
  }

  return auth.Customer && navigator('/datacreate', {replace : true})

}
