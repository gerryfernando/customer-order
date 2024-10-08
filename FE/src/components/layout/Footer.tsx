import { Box, Grid } from "@mui/material";
import TypographyCom from "../typographyCom";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "40px",
      }}
    >
      <Grid
        container
        justifyContent="end"
        paddingRight={3}
        paddingTop={1}
        alignItems="center"
        display="flex"
      >
        <Grid item>
          <TypographyCom>Website Customer Order version 0.0.1</TypographyCom>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
