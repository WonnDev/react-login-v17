import { Alert } from "react-bootstrap";

const NotFound = () =>  {
    return (
        <>
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error component not found!</Alert.Heading>
                <p>Component Not Found</p>
             </Alert>
        </>
    )
}

export default NotFound;