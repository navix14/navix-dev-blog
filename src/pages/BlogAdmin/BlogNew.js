import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasEmptyKeys } from "../../utils";
import CodeEditor from '@uiw/react-textarea-code-editor';

function BlogNew() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topics, setTopics] = useState("");
    const [date, setDate] = useState("");
    const [permalink, setPermalink] = useState("");
    const [content, setContent] = useState("");

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
            "link": permalink,
            "content": content
        }

        // Check if everything is filled out
        if (hasEmptyKeys(data)) {
            alert("Please fill out all fields");
            return;
        }

        // Update blog post
        const response = await fetch(`https://api.navix.me/api/blog-post/${permalink}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = (await response.json());

        if (result.error) {
            alert(result.message);
            return;
        }

        // Redirect to admin dashboard
        navigate("/blog/admin");
    };

    return (
        <div className="blog-admin-edit">
            <header>
                <h1>New post</h1>
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
                        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="topics">Topics</label>
                        <input type="text" id="topics" onChange={handleTopicsChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="text" id="date" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Permalink</label>
                        <input type="text" id="permalink" onChange={(e) => setPermalink(e.target.value)} />
                    </div>
                    <div className="form-group-textarea">
                        <label>Content</label>
                        <div className="code-editor">
                            <CodeEditor
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

export default BlogNew;