import "./styles/App.css";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Form from "./components/Form.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Form />
      <Footer />
    </div>
  );
}

export default App;
