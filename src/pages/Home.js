import { useEffect, useState } from "react"

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "Home | navix.dev";
        setLoaded(true);
    }, []);

    return (
        <div className={`home page ${loaded ? "active" : ""}`}>
            <div className="two-column">
                <div className="left">
                    <div className="section-box">
                        <p>About me</p>
                    </div>
                    <p className="intro-text">I am a computer science student from Germany, specializing in frontend and backend technologies.</p>
                    <div className="section-wrap">
                        <div className="section">
                            <h2>Some activities I enjoy:</h2>
                            <div className="section-list">
                                <ul>
                                    <li>Discovering new areas in computer science</li>
                                    <li>Design & prototyping of web applications</li>
                                    <li>Math puzzles</li>
                                    <li>Reverse engineering OS internals</li>
                                    <li>Low-level Windows programming</li>
                                    <li>Learning about recent AI advancements</li>
                                </ul>
                            </div>
                        </div>
                        <div className="section">
                            <h2>Hobbies:</h2>
                            <div className="section-list">
                                <ul>
                                    <li>Playing tennis & badminton</li>
                                    <li>Fitness</li>
                                    <li>Hiking</li>
                                    <li>Swimming</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="section-box">
                        <p>Skills</p>
                    </div>
                    <div className="section">
                        <h2>Programming languages I'm coherent in:</h2>
                        <div className="section-list-bullet">
                            <ul>
                                <li>JavaScript</li>
                                <li>C#</li>
                                <li>Java</li>
                                <li>C & C++</li>
                                <li>Python</li>
                                <li>SQL</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Programming languages I'm currently experimenting with:</h2>
                        <div className="section-list-bullet yellow">
                            <ul>
                                <li>Rust</li>
                                <li>Go</li>
                                <li>Clojure</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section">
                        <h2>Tools, technologies & frameworks I have experience with</h2>
                        <div className="section-list-bullet">
                            <ul>
                                <li>React</li>
                                <li>Spring MVC</li>
                                <li>Git</li>
                                <li>Node.js</li>
                                <li>SQL & NoSQL</li>
                                <li>npm</li>
                                <li>Webpack</li>
                                <li>Next.js</li>
                                <li>WordPress</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}