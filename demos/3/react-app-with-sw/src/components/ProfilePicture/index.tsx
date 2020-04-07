import React from "react";
import "./index.css";
interface ProfilePictureProps {
  src: string;
}
const ProfilePicture: React.FC<ProfilePictureProps> = ({ src }) => {
  return <img id="profile-picture" src={src} alt="Profile" />;
};
export default ProfilePicture;
