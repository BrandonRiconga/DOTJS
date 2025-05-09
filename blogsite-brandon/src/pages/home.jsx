import './home.css'
import Navbar from '../components/navbar'
import SideNav from '../components/sideNav'
import SideLogin from '../components/sideLogin'
import MainCardContent from '../components/mainCard'

import Button from '../components/Button'
import http from '../helpers/axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function home(){
  const token = localStorage.getItem('access_token')
  const [page, setPage] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [sort, setSort] = useState('-createdAt')
  const [category, setCategory] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  async function fetchAll(page, sort,filter, search){
    try {
      //get total page, call allResp which doesn't have '?page=' :')
      const allResp = await http({
        method: 'GET',
        url: `/pub/posts?search=${search}&filter=${filter}`,
        headers: {
          'Authorization': token? `Bearer ${token}` : ''
        }
      })
      const response = await http({
        method: 'GET',
        url: `/pub/posts?page=${page}&search=${search}&sort=${sort}&filter=${filter}`,
        headers: {
          'Authorization': token? `Bearer ${token}` : ''
        }
      })
      const categoryResp = await(http({
        method: 'GET',
        url: `/pub/categories`,
        headers: {
          'Authorization': token? `Bearer ${token}` : ''
        }
      }))
      const postsData = response.data
      const totalPostsPage = allResp.data
      const categoryData = categoryResp.data

      setPosts(postsData)
      setTotalPage(Math.ceil(totalPostsPage.length/10))
      setCategory(categoryData)
       
    } catch (error) {
      console.log(error) 
    }
  }

  const handlePageChange = (newPage) => {
    if(newPage >= 1 && newPage <= totalPage){
      setCurrentPage(newPage)
    }
  }

  const handleSortPage = (newSort) => {
    setSort(newSort)
  }

  const handleFilter = (newFilter) => {
    setFilter(newFilter)
  }

  //search the form (kinda useless, only for the display to not reset if user press enter)
  const handleSearch = (newSearch) => {
    newSearch.preventDefault()
    setCurrentPage(1)
    fetchAll(1,sort,filter,search)
  }

  //check value if searchbar is edited (can't do a search operation if this is deleted)
  const handleEditSearch = (editedSearch) => {
    setSearch(editedSearch.target.value)
  }

  const handleDiscuss = (event)=>{
    event.preventDefault()
    Swal.fire({
      title: 'Coming Soon',
      text: 'Stay tuned for this feature soon!',
      icon: 'info'
    })
  }

  useEffect(() => {
    //get Posts with filter, sort, pagination
    fetchAll(currentPage, sort,filter,search,page)
  },[currentPage, sort,filter,search,page]) //RE-Fetch

  return (
        <>
        <title>Document</title>
        <Navbar/>
    <div
        className="body-main">
        <div className='navbar-main'>
          {!token && <SideLogin/>}
          <SideNav/> 
        </div>
        <div>
          {/* Search and sort button */}
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
          className="form-control me-2"
          type="search"
          placeholder="Search Title"
          value={`${search}`}
          onChange={handleEditSearch}/>
        </form>
        <div className='main-control-button'>
          <div className='home-sort-btn'>
            <Button onClick={() => handleSortPage('-createdAt')} title='Latest' variant={sort==='-createdAt'? 'warning' : 'outline-warning'}/>
            <Button onClick={() => handleSortPage('createdAt')} title='Oldest' variant={sort==='createdAt' ? 'warning': 'outline-warning'}/>
          </div>
          <div className="dropdown">
            <button className='btn btn-outline-danger' onClick={()=>handleFilter('')}>Clear Filter</button>
            <button className="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" type="button">
              Filter
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              {category.map((categories) => (
                <li key={categories.id}><a className="dropdown-item" onClick={()=>handleFilter(categories.id)}>{categories.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
        {/* main content card */}
        {posts.map((post)=>(
          <MainCardContent key={post.id} fetchPosts={fetchAll} data={post}/>
        ))}
        
        <div className='pagination-button'>
          <button onClick={() =>handlePageChange(currentPage-1)}  disabled={currentPage===1} className='btn btn-outline-primary'>Previous</button>
          <button onClick={() =>handlePageChange(currentPage+1)}  disabled={currentPage===totalPage} className='btn btn-outline-primary'>Next</button>
        </div>
    </div>
    <div>
      {/* header right div*/}
      <div className='header-discuss'>
        <h5 className='header-title'>
          #discuss
        </h5>
        <small className='header-desc'>
          Discuss with other, and watch it burn
        </small>
      </div>
      {/* content div*/}
      <a href="" onClick={handleDiscuss} className='discuss-content-links'>
        <div className='discuss-content'>
          <h5 className='discuss-content-title'>
            Meme Collection
          </h5>
          <small className='discuss-content-desc'>
            Comment: 10
          </small>
        </div>
      </a>
      <a href="" onClick={handleDiscuss} className='discuss-content-links'>
        <div className='discuss-content'>
          <h5 className='discuss-content-title'>
            How to do error handling?
          </h5>
          <small className='discuss-content-desc'>
            Comment: 16
          </small>
        </div>
      </a>
        {/* footer right div*/}
        <div className='footer-discuss'>
          <h5 className='footer-title'>
            That's All~
          </h5>
        </div>
      </div>
    </div>
    </>
    )
}

export default home