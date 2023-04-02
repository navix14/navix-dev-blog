import { Outlet } from "react-router-dom";

import Container from "../components/Container";
import Navbar from "../components/Navbar";

export default function Root() {
    return (
        <>
            <Container>
                <Navbar />
                <Outlet />
            </Container>
        </>
    );
}