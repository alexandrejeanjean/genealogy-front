type TError = { response: { data: any }; message: string; request: any };

export const ErrorHandler = (
  err: TError,
  setToastVisible: Function,
  toastErrMsg: string
) => {
  if (err && err.response) {
    const axiosError = err;
    setToastVisible(true, "Sorry, an error occured: " + toastErrMsg, "error");
    return axiosError.response.data;
  } else if (err && err.request) {
    setToastVisible(true, JSON.stringify(err.message), "error");
    return err.message;
  } else {
    setToastVisible(true, "Error. Try again, or contact us.", "error");
  }
};
