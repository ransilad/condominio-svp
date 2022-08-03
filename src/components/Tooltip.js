import { Tooltip as BsTooltip } from "bootstrap"
import React, { useEffect, useRef } from "react"

export const Tooltip = ({children, text}) => {
    const childRef = useRef(undefined);

    useEffect(() => {
        const t = new BsTooltip(childRef.current, {
            title: text,
            placement: "top",
            trigger: "hover"
        })
        return () => t.dispose()
    }, [text])

    return React.cloneElement(children, { ref: childRef })
}
