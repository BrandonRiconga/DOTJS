import './mainCard.css'
import { useNavigate } from 'react-router-dom'

function MainCardContent({ data }){
    const navigate = useNavigate()
    const handleDetail = (id) => {
        try {
            navigate(`/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    let newDate = new Date(data.createdAt)
    const formattedDate = newDate.toLocaleDateString('en-GB', {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return(
        <>
            <div className='main-content' key={data.id}>
                <div className='author-info'>
                    <img src={data.imgUrl} className="author-image d-inline-block align-text-top"/>
                    <div className='author-name-date'>
                        <p className='author-name-index'> {data.User && data.User.username}</p>
                        <small className='author-post-date'>{formattedDate}</small>
                    </div>
                </div>
                <div className='main-card-content'>
                    <a href='' onClick={() => handleDetail(data.id)} className='author-title-links'><h3 className='author-title-index'>{data.title}</h3></a>
                    <a href='' onClick={() => handleDetail(data.id)} className='main-short-content'>{data.content}</a>
                    {/* button hanya sebagai styling tag, ga di-link ke filter, filter di dropdown saja */}
                    <button className="tags btn btn-outline-dark btn-sm">#{data.Category && data.Category.name}</button>
                    <div className='comment-btn-alignment'>
                        <button type='button' className='comment-btn btn btn-outline-light'>💬 1 comments</button>
                    </div>
                </div>        
            </div>
        </>
    )
}

export default MainCardContent