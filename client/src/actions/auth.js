import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  // tries to get the data for the signin by sending the data to the database/backend so it knows to sign-in the user
  try {
    const { data } = await api.signIn(formData);

    //once we have our data, we want to dispatch an action with a type of AUTH, and we want to pass the data over to our reducer
    dispatch({ type: AUTH, data });

    router.push('/'); // after we login the user, we push them to the homepage 
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  // tries to get the data for the signin by sending the data to the database/backend so it knows to sign-in the user
  try {
    const { data } = await api.signUp(formData);

    //once we have our data, we want to dispatch an action with a type of AUTH, and we want to pass the data over to our reducer
    dispatch({ type: AUTH, data });

    router.push('/'); 
  } catch (error) {
    console.log(error);
  }
};