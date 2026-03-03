import { ReactNode } from "react";
import Row from "../Row";

export default function NavbarSection({ children }: { children: ReactNode }) {
    return (
        <Row
            classes="
                items-center
                gap-2
            "
        >
            {children}
        </Row>
    );
}