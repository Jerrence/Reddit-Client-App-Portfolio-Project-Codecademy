import { createSlice } from "@reduxjs/toolkit";

// API
// view json data: https://www.reddit.com/subreddits.json
const API_ROOT = "https://www.reddit.com";

export const getSubreddits = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
        
    return json.data.children.map((subreddit) => subreddit.data);
}

const subRedditSlice = createSlice({
    name: "subreddits",
    initialState: {
        subreddits: [],
        isLoading: false,
        error: false
    },
    loadSubreddits: (state, action) => {
        state.isLoading = true;
        state.error = false;
    },
    loadSubredditsFullfilled: (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.subreddit = action.payload;
    },
    loadSubredditsRejected: (state, action) => {
        state.isLoading = false;
        state.error = true;
    }
});

export const {
    loadSubreddits,
    loadSubredditsFullfilled,
    loadSubredditsRejected
} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const fetchSubreddits = () => async (dispatch, getState) => {
    try {
        dispatch(loadSubreddits());

        const subRedditData = await getSubreddits();
        dispatch(loadSubredditsFullfilled(subRedditData));
    } catch(error) {
        dispatch(loadSubredditsRejected());
    }
};

export const selectSubreddits = (state) => state.subredditSlice.subreddits;
