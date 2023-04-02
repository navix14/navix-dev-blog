import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';

function BlogEdit() {
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topics, setTopics] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchContent = async () => {
            const data = await (await fetch(`https://api.navix.me/api/blog-post/${location.state.link}`)).json();
            setContent(data.content);
        }

        if (location.state) {
            setTitle(location.state.title);
            setDescription(location.state.description);
            setTopics(location.state.topics);
            setDate(location.state.date);
        }

        fetchContent();
    }, [location.state]);

    const handleTopicsChange = (e) => {
        const topics = e.target.value.split(",").map(topic => topic.trim());
        setTopics(topics);
    };

    const handleCancel = () => {
        navigate("/blog/admin");
    };

    const handleSave = async () => {
        const data = {
            "title": title,
            "description": description,
            "topics": topics,
            "date": date,
            "content": content
        }

        // Update blog post
        await fetch(`https://api.navix.me/api/blog-post/${location.state.link}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Redirect to admin dashboard
        navigate("/blog/admin");
    };

    return (
        <div className="blog-admin-edit">
            <header>
                <h1>Edit post</h1>
                <div className="edit-controls">
                    <button className="edit-cancel" onClick={handleCancel}>Cancel</button>
                    <button className="edit-save" onClick={handleSave}>Save</button>
                </div>
            </header>
            <div className="separator"></div>
            <main>
                <div className="edit-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topics">Topics</label>
                        <input type="text" id="topics" defaultValue={topics} onChange={handleTopicsChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="text" id="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="form-group-textarea">
                        <label>Content</label>
                        <div className="code-editor">
                            <CodeEditor
                                value={content}
                                language="markdown"
                                placeholder="Enter markdown code..."
                                onChange={(e) => setContent(e.target.value)}
                                padding={15}
                                style={{
                                    fontSize: 12,
                                    fontFamily: "monospace"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BlogEdit;