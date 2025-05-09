import { useEffect, useState } from "react"
import http from "../helpers/axios"


function formPosts(props){
    const {onSubmit, defaultValue} = props
    const [titles, setTitle] = useState('')
    const [contents, setContent] = useState('')
    const [imgUrls, setImgUrl] = useState('')
    const [categories, setCategory] = useState('')

    const [categoryVal, setCategoryVal] = useState([])

    const handleCategory = async() => {
        const response = await http({
            method: 'GET',
            url: '/pub/categories'
        })
        const allCategory = response.data
        setCategoryVal(allCategory)
    }

    useEffect(()=> {
        handleCategory()
        if(defaultValue && Object.keys(defaultValue).length > 0){
            setTitle(defaultValue.data.title)
            setContent(defaultValue.data.content)
            setImgUrl(defaultValue.data.imgUrl)
            setCategory(defaultValue.data.categoryId)
        }
    },[defaultValue])

    return(
        <form  className='create-posts-form' onSubmit={(event)=> {
            event.preventDefault();
            onSubmit({
                title: titles,
                content: contents,
                imgUrl: imgUrls,
                categoryId: categories
            })
        }}>
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" placeholder='Insert Title here' value={titles} onChange={(event)=>{
                    setTitle(event.target.value)
                }}/>
            </div>
            <div class="mb-3">
                <label class="form-label">Content</label>
                <input type="text" class="form-control" placeholder='Insert your content' value={contents} onChange={(event)=>{
                    setContent(event.target.value)
                }}/>
            </div>
            <div class="mb-3">
                <label class="form-label">Image Url</label>
                <input type="text" class="form-control" placeholder='Insert image url' value={imgUrls} onChange={(event)=>{
                    setImgUrl(event.target.value)
                }}/>
            </div>
            <div class="mb-3">
                <label class="form-label">Category</label>
                <select class="form-select" value={categories} onChange={(event)=> {
                    setCategory(event.target.value)
                }}>
                    <option>--Select Category--</option>
                    {categoryVal.map(datas=>(
                        <option key={datas.id} value={datas.id}>{datas.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default formPosts