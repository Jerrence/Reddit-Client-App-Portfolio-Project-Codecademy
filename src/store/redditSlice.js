import { createSlice } from "@reduxjs/toolkit";

// API
// view json data example link: https://www.reddit.com/r/AskReddit.json
const API_ROOT = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map((post) => post.data);
};


// view json data example link: https://www.reddit.com/r/Home/comments/114xhzh/800_to_replace_two_shingles_it_sounds_kind_of_high.json
export const getPostComments = async (permalink) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();

    return json[1].data.children.map((subreddit) => subreddit.data);
}

// redditPosts slice
const redditSlice = createSlice({
    name: "redditPosts",
    initialState: {
        posts: [],
        error: false,
        isLoading: false,
        selectedSubreddit: '/r/pics/',
        searchTerm: '',
    },

    reducers: {
        loadPosts: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        loadPostsFulfilled: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.posts = action.payload;
        },
        loadPostsRejected: (state, action) => {
            state.isLoading = false;
            state.error = true;
        },
        changeSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const {
    loadPosts,
    loadPostsFulfilled,
    loadPostsRejected,
    changeSelectedSubreddit,
    setSearchTerm
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = () => async (dispatch, getState) => {
    try {
        dispatch(loadPosts());

        const postData = await getSubredditPosts();
        dispatch(loadPostsFulfilled(postData));
    } catch(error) {
        dispatch(loadPostsRejected());
    }
};

export const selectPosts = (state) => state.redditSlice.posts;
export const selectSearchTerm = (state) => state.redditsSlice.searchTerm;

export const selectFilteredPosts = (state) => {
    const posts = state.redditSlice.posts;
    const searchTerm = state.redditSlice.searchTerm;

    if (searchTerm !== '') {
        return posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
};