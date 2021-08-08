import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'
import { getFeatureComments, makeNewComment, deleteComment } from "../../store/comments"
import EditCommentModal from "../EditCommentModal"
import reducer from "../../store/session"
import EditComment from "./editComment"
import { setComment, setId } from "../../store/newComment"
import { setEditComment, setEditId } from "../../store/editComment"
import "./getComments.css"
import NewComment from "./newComment"


const GetComments = ({featureObj}) => {
    let parentObj = featureObj.type
    let parentId = featureObj.objId
    const sessionUser = useSelector(state => state.session.user)
    const sessionComments = useSelector(state => state.comments)
    const newCommentStatus = useSelector(state => state.reply.status)
    const commentId = useSelector(state => state.reply.commentId)
    const [showNewComment, setShowNewComment] = useState(newCommentStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFeatureComments(featureObj))
        setShowNewComment(newCommentStatus)


    }, [dispatch, newCommentStatus, NewComment, featureObj])



    const openNewComment = (id) => {
        dispatch(setComment(true))
        dispatch(setId(id))
    }
    const closeNewComment = () => {
        dispatch(setComment(false))
    }


    const comments= (

        sessionComments.comments?.map(comment => {
            let edit
            let menu
            if(comment.user_id === sessionUser.id) {
                menu = (
                <>
                <img className="reply_btn" onClick={()=>openNewComment(comment.id)} src={"https://image.flaticon.com/icons/png/512/54/54761.png"} />

                <img className="cancel_btn" src={"https://image.flaticon.com/icons/png/512/561/561189.png"} onClick={()=>closeNewComment()} />
                <EditCommentModal
                className="edit_btn"
                    comment={comment}
                    featureObj={{type: "Comment", objId: comment.id,
                    parentObj, parentId
                }}
                />

                </>
            )}
            if(comment.user_id !== sessionUser.id) {
                menu = (
                <>
                <img className="reply_btn" onClick={()=>openNewComment(comment.id)} src={"https://image.flaticon.com/icons/png/512/54/54761.png"} />
                <img className="cancel_btn" src={"https://image.flaticon.com/icons/png/512/561/561189.png"} onClick={()=>closeNewComment()} />
                </>
            )}

            const retrieveThread = (thing) => thing.thread.map(thread => {
                if(thread.user_id === sessionUser.id) {
                    menu = (
                        <>
                        <img className="reply_btn" onClick={()=>openNewComment(thread.id)} src={"https://image.flaticon.com/icons/png/512/54/54761.png"} />
                        <img className="cancel_btn" src={"https://image.flaticon.com/icons/png/512/561/561189.png"} onClick={()=>closeNewComment()} />
                        <EditCommentModal
                            comment={thread}
                            featureObj={{type: "Comment", objId: thread.id,
                                parentObj, parentId
                        }}
                        />
                        </>
                )}
                if(thread.user_id !== sessionUser.id) {
                    menu = (
                    <>
                    <img className="reply_btn" onClick={()=>openNewComment(thread.id)} src={"https://image.flaticon.com/icons/png/512/54/54761.png"} />
                    <img className="cancel_btn" src={"https://image.flaticon.com/icons/png/512/561/561189.png"} onClick={()=>closeNewComment()} />
                    </>

                )}

                if(thread.thread.length !== 0) {
                    return  (
                        <div
                        key={thread.id}
                        className="comment_thread ">
                            <div className="comment_box">
                                <Link className="user_link" to={`/users/${thread.user_id}`}>
                                    <img className="user_pic pic_on"  src={thread.user_pic}/>
                                    <a className="pic_off">{thread.user_name} </a>
                                </Link>
                                <div className="colon">:</div>
                                <div className="comment_comment">

                                    {thread.description}

                                    { showNewComment && ( <> {thread.id === commentId && (<NewComment
                                        featureObj={{type: 'Comment', objId: thread.id,
                                        parentObj, parentId:thread.id }}
                                        hideForm={()=>closeNewComment()}
                                        showNewComment={showNewComment}
                                        />)}</>)
                                    }

                                </div>
                                <div className="btn_box">
                                    <div className="show_btn">...</div>
                                    <div className="show_menu">{menu}</div>
                                </div>
                            </div>
                            <div className="inner_comment">

                                {retrieveThread(thread)}

                            </div>
                        </div>
                    )
                }
                return (
                    <div key={thread.id}>
                        <div className="comment_box ">
                            <Link className="user_link" to={`/users/${thread.user_id}`}>
                                <img className="user_pic pic_on"  src={thread.user_pic}/>
                                <a className="pic_off">{thread.user_name} </a>
                            </Link>
                            <div className="colon">:</div>
                            <div className="comment_comment">

                                {thread.description}
                                { showNewComment  && ( <> {thread.id === commentId && (<NewComment
                                    featureObj={{type: 'Comment', objId: thread.id,
                                    parentObj, parentId:parentId }}
                                    hideForm={()=>closeNewComment()}
                                    showNewComment={showNewComment}
                                    />)}</>)
                                }
                            </div>
                            <div className="btn_box">
                                <div className="show_btn">...</div>
                                <div className="show_menu">{menu}</div>
                            </div>
                        </div>
                    </div>
                )
            })

            return (
            <div key={comment.id} className="comment_thread" >
                <div className="comment_box ">
                    <Link className="user_link" to={`/users/${comment.user_id}`}>
                        <img className="user_pic pic_on"  src={comment.user_pic}/>
                        <a className="pic_off">{comment.user_name} </a>
                    </Link>
                    <div className="colon"> : </div>
                    <div className="comment_comment ">

                        {comment.description}

                            { showNewComment && ( <> {comment.id === commentId && (<NewComment
                                featureObj={{type: 'Comment', objId: comment.id,
                                parentObj, parentId:parentId }}
                                hideForm={()=>closeNewComment()}
                                showNewComment={showNewComment}
                                />)}</>)
                            }
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
        <>
            <div className="comments_bord">
                <div className="add_comment ">
                    <NewComment
                        featureObj={{type: 'User', objId: parentId,
                        parentObj, parentId:parentId }}
                        hideForm={()=>closeNewComment()}/>
                </div>
                {comments}
            </div>
        </>
    )

}

export default GetComments
