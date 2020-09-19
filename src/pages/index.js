import useSWR from 'swr';
import { useState } from 'react';
import AddComment from '../components/addComment';
import CommentList from '../components/commentList';
import SignInModal from '../components/signin';

export default function Index() {
  const [ haveToLogIn, setHaveToLogIn ] = useState(false);
  const { data, isValidating, error } = useSWR('/api/comments');

  if (isValidating || !data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data)
    return (
      <div>
        {data.comments.length > 0 && <CommentList comments={data.comments || data} />}
        <AddComment setHaveToLogIn={setHaveToLogIn} />
        <SignInModal haveToLogIn={haveToLogIn} setHaveToLogIn={setHaveToLogIn} />
      </div>
    );
}

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:8080/api/comments');
//   const comments = await response.json();
//   return {
//     props: { comments }
//   };
// }
