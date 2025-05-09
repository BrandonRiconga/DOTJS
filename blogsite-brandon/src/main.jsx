import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import LoggedinLayout from './pages/loginLayout'
import ManagePosts from './pages/managePosts'
import CreatePosts from './pages/createPosts'
import EditPosts from './pages/editPosts'
import ListCategory from './pages/listCategory'
import DetailPosts from './pages/detailPosts'
import UploadImages from './pages/uploadImage'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {/*import roboto font*/}
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"/>
    {/*import bootstrap*/}
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossOrigin="anonymous"/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/:id" element={<DetailPosts/>}/>
        <Route element={<LoggedinLayout />}>
          <Route path="/register" element={<Register/>}/>
          <Route path = "/posts" element={<ManagePosts/>}/>
          <Route path = "/posts/create" element={<CreatePosts/>}/>
          <Route path = "/posts/edit/:id" element={<EditPosts />} />
          <Route path = "/posts/upload/:id" element={<UploadImages />} />
          <Route path = "/category" element={<ListCategory/>}/>
        </Route>
      </Routes> 
    </BrowserRouter>
  </StrictMode>,
)
