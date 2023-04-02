import { useEffect, useState } from 'react';

import BlogEntry from '../../components/BlogEntry';
import SortControls from '../../components/SortControls';

function Blog() {
    const [blogEntries, setBlogEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [activeTag, setActiveTag] = useState("all");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "Blog | navix.dev";

        const fetchBlogEntries = async () => {
            const data = await (await fetch("https://api.navix.me/api/blog-summary")).json();

            setBlogEntries(data);
            // Sort by descending date initially (latest first)
            setFilteredEntries(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
            setLoaded(true);
        }

        fetchBlogEntries();
    }, []);

    const handleSortChanged = (sortOrder) => {
        let oldEntries = [...filteredEntries];

        oldEntries.sort((a, b) => {
            return (sortOrder === "desc" ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date));
        });

        setFilteredEntries(oldEntries);
    };

    const handleTagChanged = (tag) => {
        setActiveTag(tag);
        tag === "all" ? setFilteredEntries(blogEntries) :
            setFilteredEntries(blogEntries.filter(entry => entry.topics.includes(tag)));
    }

    return (
        <div className={`content page ${loaded ? "active" : ""}`}>
            <h1>Blog</h1>
            <SortControls
                onSortChanged={handleSortChanged}
                onTagChanged={handleTagChanged}
                isTagSelected={activeTag !== "all"}
            />
            {filteredEntries.map((entry, index) => (
                <BlogEntry
                    info={entry}
                    onTagSelected={handleTagChanged}
                    selectedTag={activeTag}
                    key={index}
                />
            ))}
        </div>
    );
}

export default Blog;