import { FaEnvelope, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-black inline-block pb-2">Get In Touch</h2>
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8">
          <a href="/contact" className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <FaEnvelope />
            </div>
            <span className="font-bold">Email Me</span>
          </a>
          
          <a href="https://www.linkedin.com/in/pavan-a-kustagi/"  target="_blank" className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <FaLinkedin />
            </div>
            <span className="font-bold">LinkedIn</span>
          </a>
          
          <a href="https://x.com/Pavan_Kustagi"  target="_blank" className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <FaTwitter />
            </div>
            <span className="font-bold">Twitter</span>
          </a>
        </div>
      </div>
    </section>
  );
}
