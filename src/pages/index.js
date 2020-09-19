import { useState } from 'react';
import AddComment from '../components/addComment';
import CommentList from '../components/commentList';
import SignInModal from '../components/signin';

export default function Index() {
  const [ haveToLogIn, setHaveToLogIn ] = useState(false);

  return (
    <div>
      <CommentList />
      <AddComment setHaveToLogIn={setHaveToLogIn} />
      <SignInModal haveToLogIn={haveToLogIn} setHaveToLogIn={setHaveToLogIn} />
    </div>
  );
}