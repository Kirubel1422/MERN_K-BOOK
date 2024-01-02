import axios from "axios";
import { useConfig } from "./useConfig";
import { useEffect, useState } from "react";

import { useDate } from "./useDate";

export const usePost = () => {
  const [isLoading, setIsloading] = useState(null);
  const [error, setError] = useState(null);

  const [myPosts, setMyPosts] = useState();
  const [publicPosts, setPublicPosts] = useState();
  const URL = "http://localhost:3000/api/posts";

  const { config } = useConfig();
  const { formatDate } = useDate();

  const fetchMyPosts = async () => {
    setMyPosts(null);
    try {
      const response = await axios.get(URL, config);
      setMyPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPublicPosts = async () => {
    setPublicPosts(null);
    setIsloading(true);
    try {
      const response = await axios.get(URL + "/all", config);
      const usernames = response.data.usernames;
      const contents = response.data.contents;
      const preDates = response.data.dates;

      const dates = preDates.map((date) => {
        return formatDate(date);
      });
      const publicPosts = Array();
      for (let i = 0; i < contents.length; i++) {
        const username = usernames[i];
        const post = contents[i];
        const date = dates[i];
        const publicPost = {
          username: username,
          post: post,
          date: date,
        };

        publicPosts.push(publicPost);
      }
      setPublicPosts(publicPosts);
      setIsloading(false);
    } catch (error) {
      setError(error.response.data.error);
      console.error(error);
      setIsloading(false);
    }
  };
  useEffect(() => {
    fetchMyPosts();
    fetchPublicPosts();
  }, []);

  const post = async (content) => {
    setIsloading(true);
    setError(null);
    try {
      await axios.post(URL, { content: content }, config);
      setIsloading(false);
      fetchMyPosts();
    } catch (error) {
      setIsloading(false);
      setError(error.response.data.error);
    }
  };
  return {
    post,
    error,
    isLoading,
    myPosts,
    publicPosts,
    fetchMyPosts,
    fetchPublicPosts,
  };
};
