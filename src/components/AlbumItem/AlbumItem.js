import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import api from '../../api/api'
import load from '../../images/loader.gif'

const AlbumItem = () => {
    const [list, changeList] = useState()
    const [loader, changeLoader] = useState(false)
    let {albumId} = useParams()

    useEffect(() => {
        api.get(`albums/${albumId}/photos`)
            .then((res) => {
                console.log(res.data)
                return res.data
            })
            .then((listItems) => {
                let listPhotos = listItems.map((elem) => {
                    return(
                        <li className="galleries-item" key={elem.id}>
                            <ReactFancyBox
                                thumbnail={elem.thumbnailUrl}
                                image={elem.url}
                                caption={elem.title}
                            />
                            {/*<img src={elem.thumbnailUrl} alt={elem.title}/>*/}
                        </li>
                    )
                })
                changeList(listPhotos)
                changeLoader(true)
            })
            .catch((e) =>{
                console.log(`😱 Axios request failed: ${e}`);
            })
    }, [])

    const imgLoader = () => {
        return <img className="load-img" src={load} alt='Alt'/>
    }

    return(
        <div className="container">
            <h1 className="page-title">Galleries</h1>
            <ul>
                {loader ? list : imgLoader()}
            </ul>
        </div>
    )
}

export default AlbumItem