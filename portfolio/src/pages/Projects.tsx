import { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Second Brain',
      description: 'A knowledge management system for organizing and connecting your thoughts, ideas, and resources in a meaningful way.',
      tags: ['React', 'TypeScript', 'Markdown', 'Graph Database', 'Tailwind CSS'],
      category: 'web',
      image: 'https://img.freepik.com/free-vector/brain-icon-vector-illustration_1308-140991.jpg',
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      id: 2,
      title: 'Task Manager',
      description: 'A cloud-based Task Manager web app that helps you organize, prioritize, and track your tasks with a clean and intuitive interface.',
      tags: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS', 'Redux', 'Firestore'],
      category: 'web',
      image: '/images/task-manager.jpg',
      demoUrl: 'https://task-manager-wqqy.onrender.com',
      codeUrl: 'https://github.com/pavan-ak1/Task-Manager.git',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'My personal portfolio website built with React, TypeScript, and Tailwind CSS. Showcases my projects, skills, and experience.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Icons'],
      category: 'web',
      image: '/images/portfolio.jpg',
      demoUrl: 'https://pavan-ak1.github.io/Portfolio/',
      codeUrl: 'https://github.com/pavan-ak1/Portfolio',
    },
    {
      id: 3,
      title: 'E-commerce Dashboard',
      description: 'Admin dashboard for an e-commerce platform with product management, order tracking, and analytics.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
      category: 'web',
      image: '/images/ecommerce-dashboard.jpg',
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'A weather application that provides current weather and forecast using OpenWeather API.',
      tags: ['React', 'OpenWeather API', 'Axios', 'Tailwind CSS'],
      category: 'web',
      image: '/images/weather-app.jpg',
      demoUrl: '#',
      codeUrl: '#',
    },
  ];

  const categories = ['all', 'web'];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project comes with a brief description and the technologies used.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p 
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Live Demo
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
