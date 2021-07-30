import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import { getFeatureComments, editOneComment, makeNewComment, deleteComment } from "../../store/comments"

const EditComment = ({comment, hideForm, featureObj}) => {
    const sessionUser = useSelector(state => state.sessionUser)
    const [updateComment, setUpdateComment] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    console.log("COMMENT", comment)
    console.log("FEATURE", featureObj)
    console.log("SESSION", hideForm)

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
            console.log('Test', featureObj.type.toLowerCase(), featureObj.objId)
        dispatch(editOneComment(editedComment))
        setUpdateComment("")
        // history.push(`/${featureObj.type.toLowerCase()}`)
        // hideForm()
        history.push('/')
        }
    }
    const handleCancel = async(e) => {
        hideForm()
        e.preventDefault();
        setUpdateComment("")
        console.log("Updated", updateComment)
    }
    const handleDelete = async(e) => {
        e.preventDefault()
        let id = comment.id
        let obj = {id, ...featureObj}
        await dispatch(deleteComment(obj))
        hideForm()
    }


    return (
        <>
        <form>
            <input type="text"
            value={updateComment}
            placeholder={comment.description}
            onChange={(e) => setUpdateComment(e.target.value)} />
            <button type="submit" onClick={handleCommit}>Update</button>
        </form>
        <button onClick={handleCancel}>X</button>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default EditComment
