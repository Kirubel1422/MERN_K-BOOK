import heroSVG from "../files/hero.svg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="py-10 md:py-20 border-b-2">
      <div className="grid md:grid-cols-2 gap-2 gap-y-4 place-items-center  text-cyan-800 ">
        <div className="md:pl-10">
          <div className="text-lg lg:p-10 md:p-6 p-4 border-2">
            <h1 className="text-2xl md:text-4xl py-3 md:py-6 text-center font-bold">
              K-BOOK
            </h1>
            Discover a universe of stories at <strong>K-BOOK</strong>. Post,
            read, and connect with a community passionate about words. Your
            journey into a world of endless narratives begins here. Explore,
            share, and be part of the story at K-BOOK.
            <div className="py-3">
              <Link
                to="/account"
                type="button"
                className="capitalize text-xl bg-cyan-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-cyan-400 hover:shadow-md transition-all duration-100"
              >
                join now
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            src={heroSVG}
            loading="lazy"
            width={500}
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
