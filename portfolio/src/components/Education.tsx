import { motion } from 'framer-motion';

const educationData = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'University of Visvesvaraya College of Engineering, Bengaluru', 
    year: '2023 - 2027',
    description: 'Relevant coursework: Data Structures, Algorithms, Database Management, Web Development, Machine Learning, Computer Networks',
    gpa: '9.41/10 CGPA (First 4 Semesters)'
  },
  {
    id: 2,
    degree: 'Pre-University Education (PCMB)',
    institution: 'Ashok Composite PU College',
    year: '2021 - 2023',
    description: 'Specialized in Physics, Chemistry, Mathematics, and Biology',
    gpa: '94% in PUC II'
  },
  {
    id: 3,
    degree: 'High School (SSLC)',
    institution: 'St. Marys Public School',
    year: '2010 - 2021',
    description: 'General Subjects',
    gpa: '91.6%'
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#4B0082] dark:text-[#B19CD9]">
          Education
        </h2>
        
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">{edu.institution}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{edu.year}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-3">{edu.description}</p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                  {edu.gpa}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
