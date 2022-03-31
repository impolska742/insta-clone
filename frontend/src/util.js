export const postDetails = (pics, setPhoto, setPhotoMessage) => {
  if (pics === null) {
    return setPhotoMessage("Please select an Image");
  } else {
    setPhotoMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "vaibhav19bhardwaj");
      fetch("https://api.cloudinary.com/v1_1/vaibhav19bhardwaj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.url.toString());
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPhotoMessage("Please select an image.");
    }
  }
};

export const getSender = (userInfo, users) => {
  if (users[0]._id !== userInfo.id) return users[0];
  else return users[1];
};
