import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getFeatureComments, makeNewComment, deleteComment } from "../../store/comments"
import NewComment from "./newComment"
import GetComments from "./getComments"

const Comment = () => {
    const sessionUser = useSelector(state => state.session.user)
    const sessionComments = useSelector(state => state.comments)
    const dispatch = useDispatch()

    useEffect(() => {},[]);



    console.log("Sesh", sessionComments)


    let featureObj = {type: 'User',
                        objId: 1}

    return (
        <div className="comment">
            <h2>Comments</h2>
            <NewComment featureObj={featureObj}/>
            <GetComments featureObj={featureObj}/>
        </div>
    )

}

export default Comment
