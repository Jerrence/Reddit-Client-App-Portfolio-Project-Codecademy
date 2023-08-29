import { configureStore } from "@reduxjs/toolkit";
import redditSlice from './redditSlice';
import subRedditSlice from './subRedditSlice';

const store = configureStore({
    reducer: {
        redditSlice: redditSlice,
        subredditSlice: subRedditSlice
    }
});

export default store;
