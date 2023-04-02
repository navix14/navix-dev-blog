
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogAdmin() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await (await fetch('https://api.navix.me/api/blog-summary')).json();
            setPosts(data);
            setFilteredPosts(data);
        }

        fetchPosts();
    }, []);

    const handleFilter = (e) => {
        const filter = e.target.value;
        const filtered = posts.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()));
        setFilteredPosts(filtered);
    };

    const handleDelete = async (post) => {
        if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
            return;
        }

        const response = await (await fetch(`https://api.navix.me/api/blog-post/${post.link}`, {
            method: "DELETE",
            credentials: "include"
        })).json();

        if (response.message === "Post deleted") {
            setPosts(prev => prev.filter(p => p.link !== post.link));
            setFilteredPosts(posts);
        }
    };

    const handleEdit = (post) => {
        navigate(`/blog/admin/edit`, { state: post });
    };

    return (
        <div className="blog-admin">
            <h1>Manage blog</h1>
            <div className="separator"></div>
            <header>
                <h2>Blog posts</h2>
                <div className="header-controls">
                    <button className="add-new" onClick={() => navigate("new")}>New</button>
                    <input type="text" placeholder="Filter ..." onChange={handleFilter} />
                </div>
            </header>
            <main>
                {filteredPosts.map(post => (
                    <div className="post" key={post.link}>
                        <div className="post-left">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="post-right">
                            <div className="post-date">{post.date}</div>
                            <div className="buttons">
                                <button className="post-edit" onClick={() => handleEdit(post)}>Edit</button>
                                <button
                                    className="post-delete"
                                    onClick={() => handleDelete(post)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}

export default BlogAdmin;