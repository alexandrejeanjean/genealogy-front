import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

type TToaster = {
  children: React.ReactNode;
};

const Toaster = ({ children }: TToaster) => {
  // Find our portal container in the DOM
  const portalRoot = document.getElementById("portal-root");

  /* 
       Create a div as a wrapper for our toast
       using the useMemo hook so that a new value isn't 
       computed on every render
    */
  const toastContainer = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    /* 
       Append our toast container to the portal root
    */
    portalRoot && portalRoot.appendChild(toastContainer);

    /* 
       Clean up the DOM by removing our toast container
       when the component is unmounted
    */
    return () => {
      toastContainer.remove();
    };
  });

  /* 
       Render any child elements to the portal root
    */
  if (portalRoot) return createPortal(children, portalRoot);

  return null;
};

export default Toaster;
