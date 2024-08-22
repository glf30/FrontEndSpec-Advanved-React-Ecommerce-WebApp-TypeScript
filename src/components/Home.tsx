import { Container, Button } from "react-bootstrap";
import NavigationBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <Container fluid className="p-0">
        {/* Hero Section */}
        <div className="bg-dark text-white text-center py-5">
          <h1 className="display-4">Welcome to Our E-Commerce Site</h1>
          <p className="lead">Find the best products at unbeatable prices.</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/products", { replace: true })}
          >
            Shop Now
          </Button>
        </div>

        {/* About Us Section */}
        <Container className="my-5">
          <h2>About Us</h2>
          <p>
            We are committed to offering the highest quality products at
            affordable prices. Explore our wide range of products and experience
            top-notch customer service.
          </p>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
