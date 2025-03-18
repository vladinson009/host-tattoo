import postService from '../../services/postService';
import userService from '../../services/userService';

export async function fetchPosts(setPost, _id, signal) {
  const fetchArists = await postService.getPosts(signal);
  const updatedArtists = fetchArists.map((post) => {
    return { ...post, isLiked: post?.likes?.includes(_id) };
  });
  setPost(updatedArtists);
}
export function refreshPosts(prevValue, likes, artistId) {
  const newArtists = prevValue.map((artist) => {
    if (artist.objectId === artistId) {
      return { ...artist, likes, isLiked: !artist.isLiked };
    }
    return artist;
  });
  return newArtists;
}
export async function onLike(setPost) {
  const postId = this.objectId;
  const { objectId: currentUserId } = await userService.retrieveUser();
  const { likes } = await postService.addLikeToPost(postId, currentUserId);

  setPost((prevValue) => refreshPosts(prevValue, likes, postId));
}
export async function onUnlike(setPost) {
  const postId = this.objectId;
  const { objectId: currentUserId } = await userService.retrieveUser();
  const { likes } = await postService.removeLikeFromPost(postId, currentUserId);
  setPost((prevValue) => refreshPosts(prevValue, likes, postId));
}
export async function onPostLikes() {
  //TODO: show likes;
}
