import { 
  FaHtml5, FaCss3, FaJava, FaPython, FaReact, FaNodeJs, 
  FaGitAlt, FaGithub, FaLock, FaShieldAlt, FaServer, FaDatabase 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiCplusplus, SiExpress, 
  SiMongodb, SiJsonwebtokens, SiPostman, SiCloudinary, SiMongoose, 
  SiNextdotjs, SiMysql, SiPostgresql 
} from 'react-icons/si';

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: <SiJavascript size={20} className="text-yellow-400"/> },
        { name: "TypeScript", icon: <SiTypescript size={20} className="text-blue-600"/> },
        { name: "Java", icon: <FaJava size={20} className="text-red-500"/> },
        { name: "HTML5", icon: <FaHtml5 size={20} className="text-orange-500"/> },
        { name: "CSS3", icon: <FaCss3 size={20} className="text-blue-500"/> },
        { name: "C++", icon: <SiCplusplus size={20} className="text-blue-700"/> },
        { name: "Python (Familiar)", icon: <FaPython size={20} className="text-blue-400"/> }
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: <FaReact size={20} className="text-cyan-400"/> },
        { name: "Next.js", icon: <SiNextdotjs size={20} className="text-black"/> }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs size={20} className="text-green-500"/> },
        { name: "Express.js", icon: <SiExpress size={20} className="text-black"/> },
        { name: "REST APIs", icon: <FaServer size={20} className="text-gray-600"/> },
        { name: "MongoDB", icon: <SiMongodb size={20} className="text-green-600"/> },
        { name: "Mongoose", icon: <SiMongoose size={20} className="text-red-800"/> }
      ]
    },
    {
      title: "Authentication",
      skills: [
        { name: "JWT", icon: <SiJsonwebtokens size={20} className="text-pink-600"/> },
        { name: "bcrypt", icon: <FaLock size={20} className="text-yellow-600"/> },
        { name: "CORS", icon: <FaShieldAlt size={20} className="text-green-600"/> }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB Atlas", icon: <SiMongodb size={20} className="text-green-500"/> },
        { name: "Cloudinary", icon: <SiCloudinary size={20} className="text-blue-500"/> },
        { name: "MySQL", icon: <SiMysql size={20} className="text-blue-600"/> },
        { name: "PostgreSQL", icon: <SiPostgresql size={20} className="text-blue-400"/> }
      ]
    },
    {
      title: "Vector Databases",
      skills: [
        { name: "Qdrant", icon: <FaDatabase size={20} className="text-red-600"/> }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: <FaGitAlt size={20} className="text-orange-600"/> },
        { name: "GitHub", icon: <FaGithub size={20} className="text-black"/> },
        { name: "Postman", icon: <SiPostman size={20} className="text-orange-500"/> },
        { name: "Cloudinary Tools", icon: <SiCloudinary size={20} className="text-blue-500"/> }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center border-b-2 border-black inline-block pb-2">Skills & Technologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
