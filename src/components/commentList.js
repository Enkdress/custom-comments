import { List, Comment } from 'antd'

export default function CommentList({ comments }) {
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
        />
      )}
    />
  );
}
