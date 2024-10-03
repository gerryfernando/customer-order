import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};
const MainLayout = (props: Props) => {
  const styles = {
    padding: "75px 50px",
    margin: "0 auto",
    maxHeight: "75vh",
    overflow: "auto",
  };
  const { children } = props;
  return (
    <>
      <Navbar />
      <Sidebar />
      <Container maxWidth="xl">
        <Box sx={styles}>{children}</Box>
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
