import { usePost } from "../../../hooks/usePost";
const PublicPosts = () => {
  const { publicPosts, dependency } = usePost();
  return (
    <main className="py-3 md:py-5  place-items-center gap-x-10 bg-slate-50 relative">
      <div className="py-2 w-full">
        {publicPosts &&
          publicPosts.map((post, index) => (
            <div
              key={index}
              className="bg-cyan-50 shadow-md shadow-slate-100 my-2 p-4 w-full"
            >
              <div className="py-2">
                <h2 className="text-md flex gap-1">
                  <span className=" font-thin">User:</span>
                  <span className="text-cyan-950">{post.username}</span>
                </h2>
              </div>

              <div className="py-2">
                <p className="md:text-lg">{post.post}</p>
              </div>
              <div>
                <span className="text-sm">{post.date}</span>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default PublicPosts;
