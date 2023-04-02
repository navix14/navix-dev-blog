import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import IconCaretDown from "../icons/CaretDown";

const mockProjects = [
    {
        title: "Golang to Jasmin VM Compiler",
        description: "A compiler that parses a simplified subset of the Go Programming Language and generates optimized JVM-compatible bytecode. The goal of this project was to apply fundamental concepts & algorithms in the branch of compiler design.",
        tags: ["Java"],
        tools: [
            {
                name: "ANTLR4",
                link: "https://www.antlr.org/",
                description: "for auto-generating an LL(*) parser for grammar adhering to Golang spec"
            },
            {
                name: "Jasmin",
                link: "https://jasmin.sourceforge.net/",
                description: "for transforming IR code into JVM bytecode"
            }
        ],
        link: "https://github.com/navix14/golang-jvm-compiler"
    },
    {
        title: "Calendar PDF Generator",
        description: "This tool was created to easily generate and print refills for your calendar/planner yourself. It comes with two premade templates, one for a single page A4 layout, and a double sided A5 layout.",
        tags: ["C#"],
        tools: [
            {
                name: "PdfSharp",
                link: "http://www.pdfsharp.net/",
                description: "to faciliitate the creation & merging of PDF documents"
            },
            {
                name: "wkhtmltopdf",
                link: "https://wkhtmltopdf.org/",
                description: "to generate a base PDF document from a given HTML template"
            }
        ],
        link: "https://github.com/navix14/calendar-generator-pdf"
    },
    {
        title: "Student Project Management Web-App",
        description: "Simple Spring Boot App to showcase possible implementation of Domain Driven Design concepts. This was done as part of a group project at university.",
        tags: ["Java", "Spring MVC", "SQL"],
        tools: [
            {
                name: "Spring Boot",
                link: "https://spring.io/",
                description: "web framework"
            },
            {
                name: "MariaDB",
                link: "https://mariadb.org/",
                description: "as a database backend"
            }
        ],
        link: "https://github.com/navix14/internship-manager"
    },
    {
        title: "x86/x64 Hooking library",
        description: "Implements function hooking using JMP instructions. Uses a few different techniques to allow for code relocation in x64 targets, including instruction rewriting",
        tags: ["C++", "Low-level", "Windows Internals"],
        tools: [
            {
                name: "Zydis",
                link: "https://github.com/zyantific/zydis",
                description: "disassembler"
            }
        ],
        link: "https://github.com/navix14/detours-x64"
    }
]

export default function Projects() {
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState([]);

    useEffect(() => {
        document.title = "Projects | navix.dev";

        setOpen(new Array(mockProjects.length).fill(false));
        setLoaded(true);
    }, []);

    const handleToggleProject = (index) => {
        const contentEl = document.querySelectorAll(".project-content")[index];
        const scrollHeight = contentEl.scrollHeight;

        const newOpen = [...open];
        newOpen[index] = !newOpen[index];

        // TODO: Compute padding instead of hardcoding
        contentEl.style.height = `${newOpen[index] ? scrollHeight + 30 : 0}px`;
        contentEl.style.padding = `${newOpen[index] ? "15px" : "0 15px"}`;

        setOpen(newOpen);
    };

    return (
        <div className={`projects page ${loaded ? "active" : ""}`}>
            <h1>Projects</h1>
            <div className="projects-list">
                {mockProjects.map((project, index) => (
                    <div className="project" key={index}>
                        <div className="project-title" onClick={() => handleToggleProject(index)}>
                            <div className="left">
                                <h2>{project.title}</h2>
                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <div className="project-tag" key={index}>{tag}</div>
                                    ))}
                                </div>
                            </div>
                            <div className={open[index] ? "open" : ""}>
                                <IconCaretDown />
                            </div>
                        </div>
                        <div className={`project-content ${open ? "" : "hidden"}`}>
                            <div className="content-section">
                                <h3>Description</h3>
                                <p>{project.description}</p>
                            </div>
                            <div className="content-section">
                                <h3>Tools used</h3>
                                <ul>
                                    {project.tools.map((tool, index) => (
                                        <li key={index}>
                                            <a href={tool.link} target="_blank" rel="noreferrer">{tool.name}</a>
                                            <span>{tool.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="content-section link">
                                <h3>Link to project</h3>
                                <a href={project.link} target="_blank" rel="noreferrer" className="icon-link"><AiFillGithub size={36} /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}