import { useEffect, useState } from "react";
import { AiOutlineMail, AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

export default function Contact() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = "Contact | navix.dev";
        setLoaded(true);
    }, []);

    return (
        <div className={`contact-page page ${loaded ? "active" : ""}`}>
            <h1>Contact</h1>
            <div className="contact-methods">
                <div className="contact-method">
                    <AiOutlineMail className={"contact-icon"} />
                    <p className={"contact-text"}>
                        <a href="mailto: navix@tuta.io">navix@tuta.io</a>
                    </p>
                </div>
                <div className="contact-method">
                    <AiFillGithub className={"contact-icon"} />
                    <p className={"contact-text"}>
                        <a href="https://github.com/navix14" rel="noreferrer" target="_blank">navix14</a>
                    </p>
                </div>
                <div className="contact-method">
                    <AiFillTwitterCircle className={"contact-icon"} />
                    <p className={"contact-text"}>
                        <a href="https://twitter.com/navix_dev" rel="noreferrer" target="_blank">navix_dev</a>
                    </p>
                </div>
                <div className="contact-method">
                    <BsDiscord className={"contact-icon"} />
                    <p className={"contact-text"}>
                        navix14
                    </p>
                </div>
            </div>
        </div>
    )
}