import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getUserComments } from "../../store/comments"

const Comment = () => {
const sessionUser = useSelector(state => state.session.user)
const comments = useSelector(state => state.comments)
const dispatch = useDispatch()
console.log(sessionUser.id)

useEffect(async () => {
  await dispatch(getUserComments(sessionUser.id))
}, [dispatch])

    return (
        <h1>
            Comments
        </h1>
    )
}

export default Comment
