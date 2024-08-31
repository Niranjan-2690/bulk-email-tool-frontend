import { combineReducers } from '@reduxjs/toolkit';

// Example of a simple reducer, replace this with your actual reducers
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here
});

export default rootReducer;
