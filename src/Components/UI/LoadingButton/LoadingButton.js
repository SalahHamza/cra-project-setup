import React, { useRef, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({
  isLoading = false,
  onClick,
  keepWidth = true,
  children,
  ...props
}) => {
  const [width, setWidth] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      setWidth(ref.current.offsetWidth);
    }
  }, [isLoading, width]);

  const style = {};

  if (keepWidth && width) {
    style.minWidth = width;
  }

  return (
    <Button
      style={style}
      ref={ref}
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? onClick : null}
      {...props}
    >
      {isLoading ? (
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
