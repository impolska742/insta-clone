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

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, m, i, userId) => {
  const last_index = messages.length - 1;
  return (
    i === last_index &&
    messages[last_index].sender._id &&
    messages[last_index].sender._id !== userId
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  const last_index = messages.length - 1;
  if (
    i < last_index &&
    messages[i + 1].sender._id !== m.sender._id &&
    messages[i].sender._id !== userId
  ) {
    return 0;
  } else if (
    (i < last_index &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === last_index && messages[i].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
