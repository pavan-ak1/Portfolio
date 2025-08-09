import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
      
      <a 
        href="mailto:kustagipavan30@gmail.com"
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Mail className="h-5 w-5" />
        <span>kustagipavan30@gmail.com</span>
      </a>

      <a
        href="https://github.com/pavan-ak1"
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="h-5 w-5" />
        <span>github.com/pavan-ak1</span>
      </a>

      <a
        href="https://www.linkedin.com/in/pavan-a-kustagi/"
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="h-5 w-5" />
        <span>linkedin.com/in/pavan-a-kustagi</span>
      </a>

      <a
        href="https://twitter.com/Pavan_Kustagi"
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="h-5 w-5" />
        <span>@Pavan_Kustagi</span>
      </a>
    </div>
  );
};

export { ContactInfo };
