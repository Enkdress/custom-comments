import useSWR, { mutate, trigger } from 'swr';
import { Comment, Avatar } from 'antd';
import { useState } from 'react';
import Editor from '../components/editor';

export default function AddComment({ setHaveToLogIn }) {
  const [ submitting, setSubmitting ] = useState(false);
  const [ newComment, setNewComment ] = useState('');
  const { data } = useSWR('/api/comments');

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    const username = sessionStorage.getItem('username');

    if (!newComment) {
      return;
    }

    if (!username) {
      setHaveToLogIn(true);
    } else {
      mutate('/api/comments', { comments: [ ...data.comments, { comment: newComment, username } ] }, false);
      fetch('/api/comments/create', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          comment: newComment
        })
      });
      setSubmitting(false);
      setNewComment('');
    }
  };

  return (
    <Comment
      avatar={
        <Avatar
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="anon"
        />
      }
      content={
        <Editor onChange={handleChange} onSubmit={handleCommentSubmit} submitting={submitting} value={newComment} />
      }
    />
  );
}
