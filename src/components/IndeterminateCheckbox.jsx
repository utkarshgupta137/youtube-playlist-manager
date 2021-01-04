import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useRef } from "react";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

IndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool.isRequired,
};

export default IndeterminateCheckbox;
