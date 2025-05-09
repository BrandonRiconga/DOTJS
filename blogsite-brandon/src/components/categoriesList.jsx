import './postsList.css'

function postsList({categories}){
    return(
        <tr key={categories.id}>
            <th scope="row" className='posts-table-data'>{categories.id}</th>
            <td className='posts-table-data'>{categories.name}</td>
        </tr>
    )
}
export default postsList