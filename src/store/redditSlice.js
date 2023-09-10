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
        comments: [],
        error: false,
        isLoading: false,
        commentError: false,
        commentsIsLoading: false,
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
        loadComments: (state, action) => {
            state.commentsIsLoading = true;
            state.commentError = false;
        },
        loadCommentsFulfilled: (state, action) => {
            state.commentsIsLoading = false;
            state.commentError = false;
            state.comments = action.payload;
        },
        loadCommentsRejected: (state, action) => {
            state.commentError = true;
            state.commentsIsLoading = false;
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
    loadComments,
    loadCommentsFulfilled,
    loadCommentsRejected,
    setSearchTerm
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(loadPosts());

        const postData = await getSubredditPosts(subreddit);
        dispatch(loadPostsFulfilled(postData));
    } catch(error) {
        dispatch(loadPostsRejected());
    }
};

export const selectPosts = (state) => state.redditSlice.posts;
export const selectSearchTerm = (state) => state.redditSlice.searchTerm;
export const selectSelectedSubreddit = (state) => state.redditSlice.selectedSubreddit;

export const fetchComments = (subredditLink) => async (dispatch) => {
    try {
        dispatch(loadComments());

        const commentData = await getPostComments(subredditLink);
        dispatch(loadCommentsFulfilled(commentData));
    } catch(error) {
        dispatch(loadCommentsRejected());
    }
}

export const selectComments = (state) => state.redditSlice.comments;

export const selectFilteredPosts = (state) => {
    const posts = state.redditSlice.posts;
    const searchTerm = state.redditSlice.searchTerm;

    if (searchTerm !== '') {
        return posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
};