import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Second Brain',
    description: 'Personal Knowledge Link Manager with secure sharing and user-specific content isolation.',
    technologies: ['Node.js', 'TypeScript', 'MongoDB', 'JWT', 'Zod', 'Express.js'],
    github: 'https://github.com/pavan-ak1/second-brain.git',
    demo: 'https://memora-psi.vercel.app/',
    image: '/images/brain.png'
  },
  {
    id: 2,
    title: 'Task Manager',
    description: 'A cloud-based Task Manager web app that helps you organize, prioritize, and track your tasks with a clean and intuitive interface.',
    technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS', 'Redux', 'Firestore'],
    github: 'https://github.com/pavan-ak1/Task-Manager.git',
    demo: 'https://task-manager-wqqy.onrender.com',
    image: '/images/task-manager.jpg'
  },
  {
    id: 3,
    title: 'E-Commerce API',
    description: 'Scalable E-Commerce Backend Platform with JWT authentication, product management, and order processing system.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API', 'Helmet'],
    github: 'https://github.com/pavan-ak1/E-Commerce-API.git',
    demo: 'https://e-commerce-api-vjeb.onrender.com',
    image: '/ecommerce-api.jpg'
  },
  {
    id: 4,
    title: 'Voter Verify',
    description: 'Secure Face-Based Voter Authentication Platform with real-time face verification using DeepFace and JWT-based authentication.',
    technologies: ['Python', 'Flask', 'DeepFace', 'JWT', 'Docker', 'React'],
    github: 'https://github.com/pavan-ak1/Voter-Verify.git',
    demo: 'https://voter-verify.onrender.com/',
    image: '/voter-verify.jpg'
  },
  
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#4B0082] dark:text-[#B19CD9]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="cursor-target bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 custom-cursor-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlZWVlZWUiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSI+CiAgICBObyBpbWFnZSBhdmFpbGFibGUKICA8L3RleHQ+Cjwvc3ZnPg==';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <FiGithub className="mr-1" /> Code
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <FiExternalLink className="mr-1" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
