/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useUserStore, useProjectGridStore} from '../../../store/es2Store';
import {FAILURE, SUCCESS, displayToast} from '../../ToastUtil';
import CustomSideBar from '../CustomSideBar/CustomSideBar';
import Comment from './Comment';

import './Comments.css';
import {BASE_URL} from '../../../server-constants';

function Comments() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commentRefresh, setCommentRefresh] = useState(false);
  const userTypeId = useUserStore((state) => state.userTypeId);
  const commentsProjectId = useProjectGridStore((state) => state.commentsProjectId);
  const setCommentsProjectId = useProjectGridStore((state) => state.setCommentsProjectId);
  const handleClose = () => setCommentsProjectId('');

  const handleBtnClick = (event) => {
    event.preventDefault();
    const val = comment;
    handleAddComment(null, val);
  };
  const handleAddComment = (parentId, content) => {
    if (content == '' || !/[a-zA-Z]/.test(content)) {
      return;
    }
    const api = BASE_URL+`/project/comments/add`;

    const requestData = {
      projectId: commentsProjectId,
      parentId: parentId,
      content: content,
    };
    const token = localStorage.getItem('token');
    axios.post(api, requestData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
        .then((response) => {
          let status = FAILURE;
          if (response.status === 200) {
            if (response.data.result === 'success') {
              status = SUCCESS;
            }
          }

          if (status === FAILURE) {
            const message = response.data.message;
            if (message) {
              displayToast(message, status);
            } else {
              const error = response.data.error;
              displayToast(error, status);
            }
          } else {
            const message = response.data.message;
            if (message) {
              displayToast(message, status);
              setCommentRefresh(!commentRefresh);
              setComment('');
            }
          }
        })
        .catch((error) => {
          displayToast('Error occurred', FAILURE);
        });
  };

  const addComment = <div className='add-comment-container'>
    <div className='comment-text-area-container'>
      <textarea value={comment} onChange={(event) => setComment(event.target.value)} className="comment-field" type="text"/>
    </div>
    <div className='add-comment-btn-container'>
      <div className='add-comment-btn' onClick={handleBtnClick}>Add Comment</div>
    </div>
  </div>;
  const toRender = <div className='abstract-container'>
    <div className="abstract-title">
            Comments
    </div>
    {(userTypeId == 3)?<></>:addComment}
    <div style={{height: (userTypeId == 3)?'70%':'50%'}}
      className='abstract-content-container'>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} level={1} addComment={handleAddComment}/>
      ))}
    </div>
  </div>;

  useEffect(() => {
    const api = BASE_URL+`/project/comments/list`;

    const requestData = {
      projectId: commentsProjectId,
    };
    const token = localStorage.getItem('token');
    axios.get(api, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      params: requestData,
    })
        .then((response) => {
          const result = response.data;
          setComments(result.comments);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('token');
            navigate('/');
          }
          displayToast('Error occurred', FAILURE);
        });
  }, [commentRefresh]);

  return (
    <CustomSideBar content={toRender} closeAction={handleClose}/>
  );
}

export default Comments;
