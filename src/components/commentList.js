import useSWR from 'swr';
import { List, Comment } from 'antd';

export default function CommentList() {
  const { data, isValidating, error } = useSWR('http://localhost:8080/api/comments', { refreshInterval: 5000 });

  if (!data && isValidating) return null;
  if (error) return null;
  if (data) {
    const comments = data.comments;
    const selectedComment = document.getElementById(`comment-${comments.length - 2}`)?.offsetTop;
    const commentList = document.getElementById('list');
    if (commentList) {
      commentList.scrollTo(0, selectedComment);
    }

    return (
      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props) => (
          <Comment
            avatar="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            content={<p>{props.comment}</p>}
            author={props.username}
            id={`comment-${comments.indexOf(props)}`}
          />
        )}
      />
    );
  }
  return null;
}
