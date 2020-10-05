import React, { createContext, Component } from "react";
import Toaster from "../SharedComponents/Toast";
import Toast from "../SharedComponents/Toast/Toast";

export const ToasterContext = createContext({
  isVisible: false,
  color: "",
  msg: "",
  setToastVisible: (status: boolean, msg: string, color: string) => {},
});

type Props = {};

type State = {
  isVisible: boolean;
  color: string;
  msg: string;
};

class ToastProvider extends Component<Props, State> {
  state = {
    isVisible: false,
    msg: "",
    color: "",
    setToastVisible: (status: boolean, toastMsg: string, toastColor: string) =>
      this.setToast(status, toastMsg, toastColor),
  };

  setToast = (status: boolean, toastMsg: string, toastColor: string) => {
    this.setState({
      isVisible: status,
      msg: toastMsg,
      color: toastColor,
    });

    setTimeout(() => {
      this.setState({
        isVisible: false,
        msg: "",
        color: "",
      });
    }, 5000);
  };

  render() {
    const { color, msg, isVisible } = this.state;
    const { children } = this.props;
    return (
      <ToasterContext.Provider value={this.state}>
        {children}
        {isVisible && (
          <Toaster>
            <Toast color={color} msg={msg} />
          </Toaster>
        )}
      </ToasterContext.Provider>
    );
  }
}

export const withToast = (Component: any) => (props: any) => (
  <ToasterContext.Consumer>
    {(store) => (
      <>
        <Component {...props} {...store} />
      </>
    )}
  </ToasterContext.Consumer>
);

export default ToastProvider;
