import { useState, useEffect } from "react";
import { useRef } from "react";
import { usePost } from "../../../hooks/usePost";

import { useDate } from "../../../hooks/useDate";
import { useEditPost } from "../../../hooks/useEditPost";
import { useDeletePost } from "../../../hooks/useDeletePost";

import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const MyPosts = () => {
  const [pop, setPop] = useState(false);
  const [editValues, setEditValues] = useState({ id: "", postContent: "" });

  const { post, error, isLoading, myPosts, fetchMyPosts, fetchPublicPosts } =
    usePost();
  const { formatDate } = useDate();

  const {
    error: editError,
    isLoading: editIsLoading,
    editHandler,
  } = useEditPost();

  const {
    error: deleteError,
    isLoading: deleteIsLoading,
    deleteHandler,
  } = useDeletePost();

  const item = useRef(null);
  const editted = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const content = item.current.value;
    try {
      post(content);

      item.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteHandler(id);
      await fetchMyPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const popHandler = (id, postContent) => {
    setEditValues(null);
    setPop((prev) => !prev);
    setEditValues({ id: id, postContent: postContent });
  };
  const Edit = ({ id, postContent }) => {
    const postId = id;

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const content = editted.current.value;
        await editHandler(postId, content);
        setPop(false);
        await fetchMyPosts();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="bg-cyan-500 p-10 text-white shadow-lg shadow-cyan-950"
      >
        <form onSubmit={handleSubmit}>
          <div className="py-2 text-cyan-50">
            <label
              htmlFor="edit"
              className="text-cyan-50 font-semibold tracking-wide"
            >
              Edit Post:
            </label>
          </div>
          <input
            className="py-2 px-1 rounded-md outline-none border-2 border-cyan-600 transition-all  duration-100 ease text-cyan-950 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
            type="text"
            placeholder={postContent}
            ref={editted}
          />
          <div className="py-2">
            <input
              type="submit"
              value="Edit"
              disabled={editIsLoading}
              className="uppercase font-bold w-full bg-cyan-100 text-cyan-950 py-1 cursor-pointer rounded-md shadow-md disabled:text-cyan-500 disabled:cursor-wait disabled:bg-cyan-800 hover:bg-cyan-50 transition-all duration-100 ease"
            />
          </div>
        </form>
      </div>
    );
  };
  useEffect(() => {
    fetchMyPosts();
    fetchPublicPosts();
  }, []);
  return (
    <main className="py-3 md:py-5 grid md:grid-cols-2 grid-cols-1 place-items-center gap-x-10 bg-slate-50 relative">
      {pop && <Edit id={editValues.id} postContent={editValues.postContent} />}
      <div className="col-span-1 place-self-center w-full">
        {myPosts &&
          myPosts.map((post, index) => (
            <div key={index} className=" py-2">
              <div className="w-full bg-cyan-50 text-cyan-950 p-8 md:p-10  flex justify-between items-center shadow-slate-300 shadow-sm ml-1">
                <div>
                  <p className="flex gap-3 items-center">
                    <span className="text-sm text-cyan-700 block">Post:</span>
                    <span className="text-lg block">{post.content}</span>
                  </p>
                  <time
                    dateTime={post.edittedAt}
                    className="text-sm text-cyan-400"
                  >
                    {formatDate(post.edittedAt)}
                  </time>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="cursor-pointer"
                    onClick={() => popHandler(post._id, post.content)}
                  >
                    <MdEdit />
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => onDelete(post._id)}
                    aria-disabled={deleteIsLoading}
                  >
                    <FaRegTrashAlt />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-1 md:row-auto row-start-1 place-self-center md:place-self-start">
        <h2 className="text-lg md:text-xl">Create a post</h2>
        <form className="py-2" onSubmit={submitHandler}>
          <div>
            <textarea
              type="text"
              name="content"
              rows={5}
              cols={40}
              className="p-2 shadow-sm shadow-slate-300 border-cyan-50 border-2 bg-cyan-50 outline-none focus:border-cyan-600 placeholder:text-cyan-950 placeholder:tracking-wider"
              placeholder="Write your post..."
              ref={item}
            ></textarea>
          </div>

          <div className="py-2">
            <input
              type="submit"
              value="Post"
              disabled={isLoading}
              className="py-2 px-6  disabled:cursor-wait bg-cyan-500  text-white rounded-sm cursor-pointer hover:bg-cyan-400 active:scale-95 transition-all duration-100 ease"
            />
          </div>
          {error && (
            <div>
              <p className="text-red-500 bg-red-100 p-2 border-2 border-red-500">
                {error} <br /> {deleteError} <br /> {editError}
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default MyPosts;
