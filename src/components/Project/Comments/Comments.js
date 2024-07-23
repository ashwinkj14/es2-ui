/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from 'react';
import {useUserStore, useProjectGridStore} from '../../../store/es2Store';
import {FAILURE, SUCCESS, displayToast} from '../../ToastUtil';
import CustomSideBar from '../CustomSideBar/CustomSideBar';
import httpClient from '../../../helper/httpClient';
import Comment from './Comment';

import './Comments.css';

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
  const handleAddComment = async (parentId, content) => {
    if (content == '' || !/[a-zA-Z]/.test(content)) {
      return;
    }

    const requestData = {
      projectId: commentsProjectId,
      parentId: parentId,
      content: content,
    };

    try {
      const response = await httpClient.post(`/api/project/comments/add`, requestData);
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
    } catch (error) {
      displayToast('Unable to add comment.', FAILURE);
    };
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
    const onLoad = async () => {
      const requestData = {
        projectId: commentsProjectId,
      };

      try {
        const response = await httpClient.get(`/api/project/comments/list`, {
          params: requestData,
        });
        const result = response.data;
        setComments(result.comments);
      } catch (error) {
        displayToast('Unable to fetch comments.', FAILURE);
      };
    };
    onLoad();
  }, [commentRefresh]);

  return (
    <CustomSideBar content={toRender} closeAction={handleClose}/>
  );
}

export default Comments;
