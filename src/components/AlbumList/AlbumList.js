import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import api from '../../api/api'
import './AlbumList.scss'

const AlbumList = () => {
    const [list, changeList] = useState([])

    useEffect(() => {
        api.get('albums')
            .then((res) => {
                console.log(res.data)
                return res.data
            })
            .then((listItems) => {
                changeList(listItems)
            })
            .catch((e) =>{
                console.log(`😱 Axios request failed: ${e}`);
            })
    }, [])

    const addItem = () =>   {
        api.post(`albums`, {userId: list.length + 1, title: 'new album' + (list.length + 1)})
            .then((res) => {
                console.log(res)
                const cloneList = [...list]
                cloneList.push(res.data)
                console.log(list)
                console.log(cloneList)
                // изменим список через стейт
                changeList(cloneList)
            })
            .catch((e) =>{
                console.log(`😱 Axios request failed: ${e}`);
            })
    }

    const deleteItem = (id) => {
        api.delete(`albums/${id}`)
            .then((res) => {
                console.log(res)

                const newList = list.filter((elem) => elem.id !== id);

                changeList(newList);
            })
            .catch((e) =>{
                console.log(`😱 Axios request failed: ${e}`);
            })
    }

    const updateItem = (id) => {
        // пометим элемент как измененный
        const changedTitle = list.find((elem) => elem.id === id).title + ' ****changed****'
        api.put(`albums/${id}`, {userId: id, id: id, title: changedTitle, changed: true})
            .then((res) => {
                console.log(res)
                // найдем нужный объект
                const elemFromList = list.find((elem) => elem.id === id)
                // найдем индекс нужного объекта
                const indexInList = list.indexOf(elemFromList)
                // обновим наш список
                const updatedList = list.map((elem, index) => {
                    // если индекс списка соответствует индексу найденного элемента то изменим его на то что приходит в ответе от сервера
                    if (index === indexInList) {
                        return res.data
                    }
                    return elem
                })
                // изменим список через стейт
                changeList(updatedList)
            })
            .catch((e) =>{
                console.log(`😱 Axios request failed: ${e}`);
            })
    }

    return (
        <div className="container">
            <h1 className="page-title">Albums</h1>
            <ul>
                {
                    list.map((elem) => {
                        return (
                            <li key={elem.id} className={`${elem.changed ? 'changed' : ''}`}>
                                <Link to={`/album${elem.id}`}>
                                    {elem.title}
                                </Link>
                                <div className="btn-wrapper">
                                    <button className="del_btn" onClick={() => deleteItem(elem.id)}>Delete</button>
                                    <button className="update_btn" onClick={() => updateItem(elem.id)}>Update</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <button className="add_btn" onClick={() => addItem()}>Add Album</button>
        </div>
    )
}

export default AlbumList;