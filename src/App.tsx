import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header";
import ParticlesComponent from "./components/ParticlesComponent";
import Loading from "./components/Loading.tsx";

const Home = lazy(() => import("./pages/home/Home.tsx"));
const LaunchDetails = lazy(() => import("./pages/LauncheDetails"));

function App() {
  return (
    <Router>
      <Header />
      <ParticlesComponent />
      
      <Suspense fallback={ <Loading /> }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launches/:id" element={<LaunchDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;