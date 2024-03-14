/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import './Comment.css';
const Comment = ({comment, level, addComment}) => {
  const [replyComment, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const unescapedString = JSON.parse(`"${comment.content}"`);
  console.log(unescapedString);

  const clickReply = () => {
    setShowReplyBox(true);
  };

  const handleCancel = () => {
    setShowReplyBox(false);
  };

  const addReply = (event) => {
    event.preventDefault();
    addComment(comment.id, replyComment);
    setShowReplyBox(false);
    setReply('');
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;

    return formattedDate;
  };

  const dist = (level * 40) + 'px';
  const cardClass = (level == 1)?'comment-card':'';
  const replyBox = <div className='reply-container'>
    <div className='reply-text-area-container'>
      <textarea value={replyComment} onChange={(event) => setReply(event.target.value)} className="reply-field" type="text"/>
    </div>
    <div className='add-reply-btn-container'>
      <div className='add-reply-btn' onClick={addReply}>Send</div>
      <div className='add-reply-btn' onClick={handleCancel}>Cancel</div>
    </div>
  </div>;
  const replyBtn = <div className='comment-reply' onClick={clickReply}>Reply</div>;
  return (
    <div style={{marginLeft: dist, marginTop: '20px'}} className={cardClass}>
      <div className="comment-bubble">
        <div className='comment-meta-field'>
          <strong className='comment-username-field'>{comment.username}</strong>
          <span className='comment-created-at'>{formatDate(comment.createdAt)}</span>
        </div>
        <div className='bubble-content'>
          {unescapedString}
        </div>
        {level<3?replyBtn:<></>}
      </div>
      {showReplyBox?
      replyBox:<></>}
      {/* Render replies if there are any */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} level={level+1} addComment={addComment}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
