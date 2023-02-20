export const API_ROOT = 'https://www.reddit.com';

// view json data: https://www.reddit.com/subreddits.json
export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  
  return json.data.children.map((subreddit) => subreddit.data);
};

// view json data example link: https://www.reddit.com/r/AskReddit.json
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
};
