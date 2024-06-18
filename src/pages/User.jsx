import React, { useContext, useEffect } from 'react';
import GithubContext from '../context/github/GithubContext';
import { useParams } from 'react-router-dom';

function User() {
  const { getUser, user } = useContext(GithubContext);
  const params = useParams();
  useEffect(() => {
    getUser(params.login);
  }, []);

  return (
    <div>
      <div className="w-14 h-14">
        <img src={user.avatar_url} alt="Profile" />
      </div>
      <div>User {user.login}</div>
    </div>
  );
}

export default User;
