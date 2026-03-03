import Col from "@/components/Col";

export default async function NotFound() {
    return (
        <Col classes="w-full h-full justify-center items-center">
            <h1 className="text-3xl font-semibold">404: The requested page could not be found.</h1>
            <p className="text-lg">Are you sure you are in the right place?</p>
        </Col>
    );
}