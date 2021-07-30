import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getFeatureComments, makeNewComment, deleteComment } from "../../store/comments"
import EditComment from "./editComment"


const GetComments = (obj) => {
    const sessionUser = useSelector(state => state.session.user)
    const sessionComments = useSelector(state => state.comments)
    const [showEditComment, setShowEditComment] = useState(false)
    const dispatch = useDispatch()
    const {featureObj} = obj

    let content;
    useEffect(async () => {
        setShowEditComment(false)
        await dispatch(getFeatureComments(featureObj))

    }, [dispatch, setShowEditComment,content])

    const comments= (
        sessionComments.comments?.map(comment => {
            if(showEditComment) {
                content = (
                    <EditComment
                        comment={comment}
                        hideForm={() => setShowEditComment(false)}
                        featureObj={featureObj}
                    />
                )
            }
            if(!showEditComment) {
                content = comment.description
            }
            let description;
            if(sessionUser.id == comment.user_id){

                description = <div className="edit_comment" onClick={()=>setShowEditComment(true)}>
                    <div className="comment_description">
                        {content}
                    </div>
                </div>
            }
            if(sessionUser.id != comment.user_id){
                <div className="uneditable_comment" >
                    <div className="comment_description">
                        {comment.description}
                    </div>
                </div>
            }

            return (
                <div key={comment.id}>
                {description}
                </div>
            )
        }))


    return (
    <div className="comments">
        {comments}
    </div>
    )

}

export default GetComments
