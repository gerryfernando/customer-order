import { LocalShipping } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Stack direction="row" gap={2} alignItems="center">
          <IconButton onClick={() => navigate("/")}>
            <LocalShipping sx={{ color: "#fff", fontSize: 35 }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Customer Order Webs
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
