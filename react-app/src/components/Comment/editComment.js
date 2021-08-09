import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import { getFeatureComments, editOneComment, makeNewComment, deleteComment } from "../../store/comments"
import "./editComments.css"

const EditComment = ({comment, hideForm, featureObj}) => {
    const sessionUser = useSelector(state => state.sessionUser)
    const [updateComment, setUpdateComment] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

    }, [hideForm])


    const handleCommit = async(e) => {
        e.preventDefault()
        let oldDescription
        if(updateComment === "") {
            oldDescription =comment.description
        }
        else {
            oldDescription = updateComment
        }
        const editedComment = {
            ...comment,
            description: oldDescription,
            ...featureObj
        }
        if(editedComment){
        dispatch(editOneComment(editedComment))
        setUpdateComment("")
        hideForm()
        }
    }
    const handleCancel = async(e) => {
        e.preventDefault();
        setUpdateComment("")
        hideForm()
    }
    const handleDelete = async(e) => {
        e.preventDefault()
        let id = comment.id
        let obj = {id, ...featureObj}
        await dispatch(deleteComment(obj))
    }


    return (
        <>
        <form className="edit_form">
            <div className="input_box">
                EDIT COMMENT
                <input
                    className="edit_form_input"
                    type="text"
                    autoFocus={true}
                    value={updateComment}
                    placeholder={comment.description}
                    onChange={(e) => setUpdateComment(e.target.value)} />
            </div>
            <div className="top">
                <button className="btn cancel_btn" onClick={handleCancel}>X</button>
            </div >
            <div className="low">
                <img src={"https://image.flaticon.com/icons/png/512/3388/3388943.png"} className='btn submit_btn' onClick={handleCommit}/>
                <img src={"https://image.flaticon.com/icons/png/512/3159/3159662.png"} className="btn delete_btn" onClick={handleDelete}></img>
            </div>
        </form>
        </>
    )
}

export default EditComment
