import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getUserComments, newComment, deleteComment } from "../../store/comments"

const Comment = () => {
const sessionUser = useSelector(state => state.session.user)
const comments = useSelector(state => state.comments)
const dispatch = useDispatch()
console.log(sessionUser.id)

useEffect(async () => {
  await dispatch(getUserComments(sessionUser.id))

}, [dispatch])

    const handleCreateComment= async (e) => {
        e.preventDefault()
        const comment = {
            user_id: sessionUser.id, description:'Test Comments again'
        }
        if(comment){
            await dispatch(newComment(comment))
        }
    }

    const handleDeleteComment= async (comment) => {
        await dispatch(deleteComment(comment))
    }
    return (
        <div className="comment">
            <h2>Comments</h2>
            <form onSubmit={handleCreateComment}>
                <input type="text" placeholder="Comment" />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments?.map(comment => {
                    return (
                        <li key={comment.id}>
                            <button onClick={handleDeleteComment.bind(comment.id)}>Delete</button>
                            <span>{comment.description}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )



    return (
        <h1>
            {/* <input type="text" placeholder="Comment" onChange={}/> */}
            <button onClick={handleCreateComment}>New Comment</button>
        </h1>
    )
}

export default Comment
