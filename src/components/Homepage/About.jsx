import person from "../../../public/assets/images/about_us/person.jpg";
import parts from "../../../public/assets/images/about_us/parts.jpg";
import Image from "next/image";
const About = () => {
  return (
      <div className="container mx-auto py-8">
          <div className="hero">
      <div className="hero-content flex-col lg:flex-row">
        <div className="lg:w-1/2 relative">
          <Image alt="image"
            src={person}
            className="w-3/4 rounded-lg shadow-2xl md:h-[480px]"
          />
          <Image alt="image"
            src={parts}
            className="w-1/2 absolute right-24 top-1/2 border-8 border-white rounded-lg shadow-2xl md:h-72"
          />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <h3 className="text-3xl mt-5 text-[#FF3811] font-bold">About Us</h3>
          <h1 className="text-5xl font-bold">
            We are qualified & of experience in this field
          </h1>
          <p className="py-6">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which do not look even slightly
            believable.
          </p>
          <p className="py-6">
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which do not look even slightly
            believable.
          </p>
          <button className="btn bg-[#FF3811] text-white text-lg">
            Get More Info
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
