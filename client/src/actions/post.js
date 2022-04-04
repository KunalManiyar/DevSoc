import api from '../utils/api';
import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
//   UPDATE_LIKES,
//   DELETE_POST,
//   ADD_POST,
//   GET_POST,
//   ADD_COMMENT,
//   REMOVE_COMMENT
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    //
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

