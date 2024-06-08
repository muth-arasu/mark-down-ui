import React from "react";
import "./App.css";
import PlayGround from "./Page/PlayGround.Page";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";
import {Edit} from "./components/Edit.jsx";
import {Image} from "./components/Image.jsx";
import {Dashboard} from "./components/Dashboard.jsx";
import SignInPage from "./Page/SignIn.Page";
import SignUpPage from "./Page/SignUp.Page.jsx";
import { DraftListPage } from "./Page/DraftList.Page.jsx";
import DraftEditPage from "./Page/DraftEdit.Page.jsx";


function App() {
  return (
    <Routes>
      <Route path='/dashboard' exact element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/preview' element={<PlayGround />} />
      <Route path='/draft/list' element={<DraftListPage/>} />
      <Route path='/draft/edit/:id' exact element={<ProtectedRoute><DraftEditPage/></ProtectedRoute>} />
      <Route path='/user/edit/:id' exact element={<ProtectedRoute><Edit/></ProtectedRoute>} />
      <Route path='/user/image' exact element={<ProtectedRoute><Image/></ProtectedRoute>} />
      <Route path='*' exact element={<Navigate to='/sign-up' />} />
    </Routes>
  );
}

export default App;