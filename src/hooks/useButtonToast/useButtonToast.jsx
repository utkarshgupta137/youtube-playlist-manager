import React, { useCallback, useRef } from "react";
import { toast } from "react-toastify";

import "./useButtonToast.css";

const useButtonToast = (onClick, onClose) => {
  const toastId = useRef(null);
  const isRepeatToast = useRef(false);
  const isDismissOnClick = useRef(false);
  const isDismissOnRepeat = useRef(false);
  return {
    showButtonToast: useCallback(
      (text, buttonText) => {
        if (isRepeatToast.current) {
          isDismissOnRepeat.current = true;
          toast.dismiss(toastId.current);
        } else {
          isRepeatToast.current = true;
        }
        toastId.current = toast.dark(
          () => {
            return (
              <div id="buttonToastView">
                {text}
                <button
                  id="toast"
                  type="button"
                  onClick={() => {
                    isDismissOnClick.current = true;
                    toast.dismiss(toastId.current);
                    onClick();
                  }}
                >
                  {buttonText}
                </button>
              </div>
            );
          },
          {
            className: "buttonToast",
            closeOnClick: false,
            onClose: () => {
              if (isDismissOnRepeat.current) {
                isDismissOnRepeat.current = false;
              } else if (isDismissOnClick.current) {
                isRepeatToast.current = false;
                isDismissOnClick.current = false;
              } else {
                isRepeatToast.current = false;
                onClose();
              }
            },
          }
        );
      },
      [onClick, onClose]
    ),
  };
};

export default useButtonToast;
