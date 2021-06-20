import { Checkbox } from "@chakra-ui/react";
import React from "react";

import { IndeterminateCheckboxProps } from "./IndeterminateCheckbox.types";

export const IndeterminateCheckbox: IndeterminateCheckboxProps =
  React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || (defaultRef as any);

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox type="checkbox" ref={resolvedRef} {...rest} />;
  });
