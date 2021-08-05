import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {makeNewComment} from "../../store/comments"
import "./newComment.css"

const NewComment = ({featureObj, hideForm, showNewComment}) => {
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
            console.log("parentID", featureObj)
            await dispatch(makeNewComment({...comment, ...featureObj}))
            setNewComment('')
            hideForm()
        }
    }


    return (

            <form id="newComment" className="new_comment_box" onSubmit={handleCreateComment}>
                <input
                    className="input_comment"
                    type="text"
                    placeholder="Add Comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    autoFocus={showNewComment}
                    />
                <button className="btn btn1" type="submit">
                    <img src={"https://image.flaticon.com/icons/png/512/54/54761.png"} className="btn btn1" type="submit"></img>

                </button>
                <img src={"https://image.flaticon.com/icons/png/512/561/561189.png"} className="btn btn2" onClick={()=> setNewComment('') && hideForm}></img>

            </form>

    )



}

export default NewComment
