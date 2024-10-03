import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout";
import ErrorPage from "./pages/errorPage";
import router from "./router";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {router.map((val) => {
            return <Route path={val?.path} element={val?.element} />;
          })}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
