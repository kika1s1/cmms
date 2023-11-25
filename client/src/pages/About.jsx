// About.js

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
          About Our Competitive Programming Club
        </h1>

        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="text-lg text-gray-700">
            Welcome to our Competitive Programming Club, where we embark on a
            journey of mastering algorithms and data structures. At our core, we
            are a community of passionate problem solvers, dedicated to
            enhancing our coding skills and participating in exciting coding
            challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700">
              Our mission is to cultivate a culture of continuous learning and
              collaboration. We aim to provide a platform where members can
              sharpen their problem-solving abilities, share knowledge, and
              inspire each other to excel in the competitive programming
              landscape.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-700">
              Joining our club opens doors to a world of opportunities. From
              regular coding challenges and workshops on advanced algorithms to
              hackathons and participation in coding competitions, we offer a
              dynamic environment for members to thrive and excel in the field
              of competitive programming.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center mt-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Why Join Us?
          </h2>
          <p className="text-gray-700">
            By being a part of our Competitive Programming Club, you gain access
            to a supportive community of like-minded individuals. Whether you
            are a seasoned coder or just starting your coding journey, our club
            provides a space to learn, collaborate, and challenge yourself. Join
            us, and lets code together towards excellence!
          </p>
        </div>

        {/* You can add more sections, features, or links here */}
      </div>
    </div>
  );
};

export default About;
