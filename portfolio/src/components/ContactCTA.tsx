import { motion } from 'framer-motion';

const ContactCTA = () => {
  return (
    <section id="contact-cta" className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Let's Work Together! 👋
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and collaborations.
              </p>
            </div>
            <motion.div
              className="flex-shrink-0 mt-4 md:mt-0"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
                className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get In Touch
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
