import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About MeroPathsala</h1>
        <p className="text-lg mb-10">
          MeroPathsala is a modern online learning platform dedicated to providing quality, affordable, and accessible education to students across the globe. Whether you're a beginner or a professional, our platform empowers you to upskill and grow through curated courses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              Our mission is to bridge the education gap by delivering high-quality content at affordable prices. We aim to bring world-class instructors and practical learning directly to your screen—anytime, anywhere.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Wide range of courses including Development, Design, AI, and more</li>
              <li>Experienced instructors and industry professionals</li>
              <li>Secure course purchasing and easy progress tracking</li>
              <li>Certification upon course completion</li>
              <li>Interactive video lectures, downloadable resources, and quizzes</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Why Choose MeroPathsala?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Learn at your own pace with lifetime access</li>
              <li>Mobile-friendly learning experience</li>
              <li>Trusted by thousands of students in Nepal and beyond</li>
              <li>Dedicated student support and query resolution</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Join Our Learning Community</h2>
            <p>
              At MeroPathsala, we believe in collaborative growth. Join a community of learners and educators who are passionate about knowledge and skill development. Whether you're here to start a new career or just explore a hobby, we're here to support you.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium">Ready to start your learning journey?</h3>
          <p className="mt-2">Browse our course catalog and enroll today!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
