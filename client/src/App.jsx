import "./App.css";
import  { AuthCheckAdmin, AuthCheckCustomer } from "./componants/AuthCheck";
import {Authentication} from "./componants/Authentication";
import Data from "./componants/Data";
import DataCreate from "./componants/DataCreate";
import Login from "./componants/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoAuthrizePage from "./componants/NoAuthrizePage";
import AdminPage from "./componants/AdminPage";

function App() {

  return (
    <>
    <BrowserRouter>
    <Authentication>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/no-auth" element={<NoAuthrizePage />}/>

      <Route path="/data" element={<Data/>} />

      <Route path="/datacreate" element={
        <AuthCheckCustomer>
          <DataCreate />
        </AuthCheckCustomer>
      }/>

      <Route path="/admin" element={
        <AuthCheckAdmin>
          <AdminPage />
        </AuthCheckAdmin>
      }/>

    </Routes>
    </Authentication>
    </BrowserRouter>
    </>
  );
}

export default App;
