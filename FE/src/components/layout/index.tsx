import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};
const MainLayout = (props: Props) => {
  const styles = {
    padding: "75px 50px 75px 240px",
    margin: "0 auto",
  };
  const { children } = props;
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Sidebar />
        <Box sx={styles}>{children}</Box>
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
