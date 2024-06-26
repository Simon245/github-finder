import axios from 'axios';
import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext({});
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await github.get(`/search/users?${params}`);

    dispatch({
      type: 'GET_USERS',
      payload: response.data.items,
    });
  };

  // Get user and repos
  const getUserAndRepos = async (login) => {
    setLoading();
    const repoParams = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos?${repoParams}`),
    ]);

    dispatch({
      type: 'GET_USER_AND_REPOS',
      payload: { user: user.data, repos: repos.data },
    });
  };

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        clearUsers,
        searchUsers,
        getUserAndRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
