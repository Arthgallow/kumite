import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeNewComment} from "../../store/comments"

const NewComment = ({featureObj }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')

    useEffect(async () => {
        

    }, [dispatch, newComment])

    const handleCreateComment= async (e) => {
        e.preventDefault()
        const comment = {
            user_id: sessionUser.id, description:newComment
        }
        if(comment){
            await dispatch(makeNewComment({...comment, ...featureObj}))
            setNewComment('')
        }
    }


    return (
            <form onSubmit={handleCreateComment}>
                <input
                    type="text"
                    placeholder="Comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    />
                <button type="submit">Make Comment</button>
            </form>

    )



}

export default NewComment
