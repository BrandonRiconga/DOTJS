import './listCategory.css'

import SideNav from "../components/sideNav"
import CategoryList from "../components/categoriesList"

import http from "../helpers/axios"
import { useEffect, useState } from "react"

function listCategory(){
    const token = localStorage.getItem('access_token')
    const [categories, setCategories] = useState([])
    async function fetchCategories() {
        try {
            const response = await http({
                method: 'GET',
                url: '/category',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const categoriesData = response.data
            setCategories(categoriesData)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchCategories()
    },[])

    return(
        <>
            <div className="body-post">
                <div className="container-posts">
                    <div className='sidenav-container'>
                        <SideNav className='sidenav-styling'/>
                    </div>
                    <div className="main-content-posts">
                        <div className='posts-header-container'>
                            <h3 className="posts-title">List Category</h3>
                        </div>
                    
                        <table class="table table-light table-hover table-posts">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category)=> (
                                    <CategoryList key={category.id} categories={category} fetchCategories={fetchCategories}/>
                                ))}
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default listCategory