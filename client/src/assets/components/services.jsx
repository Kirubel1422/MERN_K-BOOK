import serviceSVG from "../files/services.svg";
const Services = () => {
  return (
    <section className="py-10 md:py-28 border-b-2 flex justify-center items-center">
      <div>
        <div>
          <h2 className="font-bold text-2xl md:text-4xl text-center py-3 md:py-10">
            Our Services
          </h2>
        </div>
        <div className="md:grid grid-cols-2 place-items-center">
          <p className="md:text-lg border-2 lg:p-10 md:p-6 p-4">
            Embark on a captivating literary journey with K-BOOK, where a
            universe of stories unfolds. Dive into a vibrant community that
            celebrates the power of words &hypen; read, share, and connect with
            fellow enthusiasts. At K-BOOK, our platform is a gateway to endless
            narratives, inviting you to explore, share your own tales, and
            become an integral part of the unfolding story. Join us and discover
            the magic of storytelling at K-BOOK, where words come alive, and
            every reader is a valued contributor to our ever-growing universe of
            stories.
          </p>
          <img
            src={serviceSVG}
            loading="lazy"
            width={400}
            className="hidden md:flex shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
