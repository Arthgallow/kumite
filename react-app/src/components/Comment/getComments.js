import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'
import { getFeatureComments, makeNewComment, deleteComment } from "../../store/comments"
import reducer from "../../store/session"
import EditComment from "./editComment"
import "./getComments.css"
import NewComment from "./newComment"


const GetComments = ({featureObj}) => {
    const sessionUser = useSelector(state => state.session.user)
    const sessionComments = useSelector(state => state.comments)
    const [showEditComment, setShowEditComment] = useState(false)
    const [showNewComment, setShowNewComment] = useState(false)
    const [showUserPic, setShowUserPic] = useState(false)
    const dispatch = useDispatch()
    console.log("BIG", featureObj)

    let content;
    useEffect(async () => {
        setShowEditComment(false)
        await dispatch(getFeatureComments(featureObj))
        setShowEditComment(false)
        setShowNewComment(false)

    }, [dispatch, setShowEditComment,featureObj])

    const comments= (

        sessionComments.comments?.map(comment => {
            let menu
            if(comment.user_id === sessionUser.id) {
                console.log("SMALL" , comment.user_id)
             menu = (
                <>
                <button onClick={()=>setShowNewComment(true)}>
                    Reply

                </button>
                <button onClick={()=>setShowEditComment(true)}>
                    Edit
                </button>
                </>
            )}
            let edit;
            let reply;
            if(comment.user_id !== sessionUser.id) {
                menu = (
                <button onClick={()=>setShowNewComment(true)}>
                    Reply
                </button>
                )}

                if(showEditComment){
                    edit = (
                        <EditComment
                            featureObj={{type: 'Comment',
                            objId: parseInt(comment.id, 10),
                            parentObj:"User"}}
                            hideForm={()=>setShowEditComment(true)}
                        />)
                }
                if(showNewComment){
                   reply =(
                       <NewComment
                           featureObj={{type: 'Comment',
                           objId: parseInt(comment.id, 10),
                           parentObj:"User"}}
                           hideForm={()=>setShowNewComment(true)}
                      /> )
               }



            const retrieveThread = (thing) => thing.thread.map(thread => {
                if(thread.thread.length !== 0) {
                    return  (
                        <div
                        className="comment_thread ">
                            <div className="comment_box">
                                <Link className="user_link" to={`/users/${thread.user_id}`}>
                                    <img className="user_pic pic_on"  src={thread.user_pic}/>
                                    <a className="pic_off">{thread.user_name} </a>
                                </Link>
                                <div className="colon">:</div>
                                <div className="comment_comment">
                                    {thread.description}
                                </div>

                            </div>
                            <div className="inner_comment">
                                {!showNewComment && retrieveThread(thread)}
                                {reply}
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="comment_box ">
                        <Link className="user_link" to={`/users/${thread.user_id}`}>
                            <img className="user_pic pic_on"  src={thread.user_pic}/>
                            <a className="pic_off">{thread.user_name} </a>
                        </Link> <div className="colon">:</div> <div className="comment_comment">
                            {thread.description}
                        </div>
                        <div className="btn_box">

                        </div>
                    </div>
                )
            })

            return (
            <div className="comment_thread" >
                <div className="comment_box ">
                    <Link className="user_link" to={`/users/${comment.user_id}`}>
                        <img className="user_pic pic_on"  src={comment.user_pic}/>
                        <a className="pic_off">{comment.user_name} </a>
                    </Link>
                    <div className="colon"> : </div>
                    <div className="comment_comment ">{comment.description}
                    </div>
                    <div className="btn_box">
                        <div className="show_btn">...</div>
                        <div className="show_menu">{menu}</div>

                    </div>
                </div>
                <div className="inner_comment">

                    {retrieveThread(comment)}
                </div>
            </div>
            )
        }))


    return (
    <div className="comments_bord">
        {comments}
    </div>
    )

}

export default GetComments
