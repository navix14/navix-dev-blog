/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";

function BlogEntry({ info, onTagSelected, selectedTag }) {
    const { title, date, description, topics } = info;

    function truncateString(str) {
        const words = str.split(' ');

        if (words.length > 50) {
            return words.slice(0, 50).join(' ') + ' ...';
        } else {
            return str;
        }
    }

    return (
        <div className="blog-entry">
            <div className="blog-header">
                <div className="blog-title">
                    <Link to={info.link}>{title}</Link>
                    <ul className="blog-topics">
                        {topics.map((topic, index) => (
                            <li className={selectedTag === topic ? "active" : ""} key={index}>
                                <a
                                    href="#"
                                    onClick={() => onTagSelected(topic)}
                                >
                                    {topic}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <p>{date}</p>
            </div>
            <div className="blog-content">
                {truncateString(description)}
            </div>
        </div>
    );
}

export default BlogEntry;