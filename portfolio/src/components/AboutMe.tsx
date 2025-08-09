import React from 'react';

const AboutMe = () => {
  return (
    <section id="about-me" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#4B0082] dark:text-[#B19CD9]">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Computer Science student at UVCE with hands-on experience in backend development, building secure and scalable software
              solutions. Enthusiastic about designing, developing, and optimizing systems that solve real-world challenges.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I'm passionate about creating efficient, maintainable code and enjoy working on complex problems that require innovative solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-[#4B0082] dark:text-[#B19CD9] mb-2">
                  {['Problem Solving', 'Web Development', 'UI/UX', 'Team Collaboration'][item - 1]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {[
                    'Strong analytical and problem-solving skills',
                    'Full-stack web development expertise',
                    'Focus on creating intuitive user experiences',
                    'Effective team player and communicator'
                  ][item - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
