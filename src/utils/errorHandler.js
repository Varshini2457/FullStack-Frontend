export const handleError = (err) => {
  console.log(err);

  let message = "Something went wrong";

  if (err.response && err.response.data) {
    if (typeof err.response.data === "string") {
      message = err.response.data;
    } else if (err.response.data.message) {
      message = err.response.data.message;
    } else {
      message = JSON.stringify(err.response.data);
    }
  } else if (err.message) {
    message = err.message;
  }

  return message;
};