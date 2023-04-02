import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm';

import 'katex/dist/katex.min.css'
import PuffLoader from "react-spinners/PuffLoader";

function BlogPost() {
    const location = useLocation();
    let [info, setInfo] = useState(null);
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            const id = location.pathname.split("/").slice(-1);
            const data = await (await fetch(`https://api.navix.me/api/blog-post/${id}`)).json();

            // await new Promise(r => setTimeout(r, 500));

            document.title = `${data.title} | navix.dev`;
            setInfo(data);
            setLoaded(true);
        }

        fetchContent();
    }, [location]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return info === null ? (
        <div className="loader">
            <PuffLoader color={"red"} />
        </div>
    ) :
        (
            <div className={`blog-post ${loaded ? 'active' : ''}`}>
                <p className="date" > Posted on: {formatDate(info.date)}</p>
                <ReactMarkdown children={`## ${info.title}`} />
                <div className={"separator"} />
                <ReactMarkdown
                    children={info.content}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        },
                        img({ node, alt }) {

                        }
                    }}
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                >
                </ReactMarkdown>
            </div>
        )
}

export default BlogPost;