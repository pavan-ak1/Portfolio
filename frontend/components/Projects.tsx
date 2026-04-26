"use client";

import Link from "next/link";
import { FaGithub, FaLaptopCode, FaCog } from "react-icons/fa";
import ElectricBorder from "./ElectricBorder";
import { useState } from "react";

const softwareProjects = [
  {
    title: "DevScope — Intelligent RAG",
    description: "RAG backend to ingest GitHub repos and ask questions about codebase using LLMs.",
    tags: ["Node.js", "TypeScript", "Qdrant", "Redis", "LangChain"],
    link: "#",
    github: "https://github.com/pavan-ak1/DevScope.git"
  },
  {
    title: "Website Explainer — AI Sidebar",
    description: "AI-powered website summarizer with Chrome extension and FastAPI RAG backend.",
    tags: ["FastAPI", "LangChain", "Chrome Ext", "Python"],
    link: "#",
    github: "https://github.com/pavan-ak1/Website-Scrapper.git"
  },
  {
    title: "Reunion — Alumni Platform",
    description: "Full-stack platform bridging students and alumni for mentorship, events, and jobs.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    link: "#",
    github: "https://github.com/pavan-ak1/ReUnion.git"
  },
  {
    title: "E-Commerce API",
    description: "Robust and secure E-Commerce API built with Node.js, Express, and MongoDB.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    link: "#",
    github: "https://github.com/pavan-ak1/E-Commerce-API.git"
  },
  {
    title: "Heart Disease Predictor",
    description: "Full-stack solution for predicting heart disease using a KNN model with FastAPI and Next.js.",
    tags: ["Python", "FastAPI", "Next.js", "Scikit-learn"],
    link: "#",
    github: "https://github.com/pavan-ak1/Heart-Disease-Predictor.git"
  },
  {
    title: "Memora — Second Brain",
    description: "Backend service for storing and managing links with sharing capabilities.",
    tags: ["Node.js", "TypeScript", "MongoDB", "JWT"],
    link: "#",
    github: "https://github.com/pavan-ak1/second-brain.git"
  }
];

const competitiveProgramming = [
  {
    title: "LeetCode",
    description: "Solve algorithmic problems and improve coding skills with daily challenges.",
    tags: ["Algorithms", "Data Structures", "Problem Solving"],
    link: "https://leetcode.com/pavan_kustagi/",
    github: ""
  },
  {
    title: "Codeforces",
    description: "Competitive programming platform with regular contests and global rankings.",
    tags: ["Competitive Programming", "Contests", "Algorithms"],
    link: "https://codeforces.com/profile/Pavan-Ak1",
    github: ""
  },
  {
    title: "HackerRank",
    description: "Practice coding challenges and prepare for technical interviews.",
    tags: ["Problem Solving", "Interview Prep", "Algorithms"],
    link: "https://www.hackerrank.com/profile/kustagipavan30",
    github: ""
  },
  {
    title: "GeeksforGeeks",
    description: "Comprehensive platform for coding practice and interview preparation.",
    tags: ["DSA", "Interview Prep", "Programming"],
    link: "https://www.geeksforgeeks.org/profile/kustagip6y43",
    github: ""
  },
  {
    title: "CodeChef",
    description: "Platform for competitive programming with monthly contests and global rankings.",
    tags: ["Competitive Programming", "Contests", "Algorithms"],
    link: "https://www.codechef.com/users/pavan_ak1",
    github: ""
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'software' | 'competitive'>('software');

  const currentProjects = activeTab === 'software' ? softwareProjects : competitiveProgramming;

  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center border-b-2 border-black inline-block pb-2">What I’ve Built...</h2>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('software')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'software'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaLaptopCode className="text-lg" />
              Software Projects
              {activeTab === 'software' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('competitive')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'competitive'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaCog className="text-lg" />
              Competitive Programming
              {activeTab === 'competitive' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <ElectricBorder key={index} color="#2172ecff" borderRadius={12} className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all h-full">
              <div className="flex flex-col h-full p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold px-2 py-1 bg-gray-100 border border-black rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  {activeTab === 'competitive' ? (
                    <Link href={project.link} className="flex items-center gap-2 hover:underline font-medium text-indigo-600">
                      Visit Platform
                    </Link>
                  ) : (
                    <Link href={project.github} className="flex items-center gap-2 hover:underline font-medium">
                      <FaGithub /> Code
                    </Link>
                  )}
                </div>
              </div>
            </ElectricBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
