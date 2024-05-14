import { Box } from "@mui/material";
import avatar from "../assets/images/noDp.jpeg";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={image ? `http://localhost:4001/assets/${image}` : avatar}
        alt="user-Img"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;
