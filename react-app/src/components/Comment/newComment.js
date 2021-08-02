import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeNewComment} from "../../store/comments"
import "./newComment.css"

const NewComment = ({featureObj}) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')

    useEffect(async () => {


    }, [dispatch, newComment])

    const handleCreateComment= async (e) => {

        e.preventDefault()
        const comment = {
            user_id: sessionUser.id,
            description:newComment,
            user_name: sessionUser.username,
            user_img: sessionUser.user_image
        }
        if(comment){
            await dispatch(makeNewComment({...comment, ...featureObj}))
            setNewComment('')
        }
    }


    return (
            <form onSubmit={handleCreateComment}>
                <input
                    className="new-comment"
                    type="text"
                    placeholder="Add Comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    />
                <button className="btn" type="submit">Make Comment</button>
            </form>

    )



}

export default NewComment
