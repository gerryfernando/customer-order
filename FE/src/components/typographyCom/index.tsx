import { Box, Typography } from "@mui/material";

const TypographyCom = ({
  children,
  bold = false,
  semiBold = false,
  big = false,
  small = false,
  title = false,
  textAlign,
  sx,
  fontSize,
  fontWeight,
  color = "#000000DE",
  ...props
}: any) => {
  const styles = {
    fontWeight:
      bold || title
        ? "800"
        : semiBold
        ? "600"
        : fontWeight
        ? fontWeight
        : "400",
    fontSize:
      big || title ? "36px" : small ? "14px" : fontSize ? fontSize : "16px",
    color: color,
  };

  return (
    <Box>
      <Typography
        sx={{ wordBreak: "break-word", ...sx, ...styles }}
        textAlign={textAlign}
        fontSize={fontSize}
        {...props}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default TypographyCom;
