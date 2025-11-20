import { memo } from "react"

type BasePanelProps = {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    className?: string;
    style?: React.CSSProperties;
}

function BasePanel(props: BasePanelProps) {
    return (
        <div
            className={`base-panel ${props.className || ''}`}
            style={{
                width: props.width,
                height: props.height,
                minWidth: props.minWidth,
                maxWidth: props.maxWidth,
                minHeight: props.minHeight,
                maxHeight: props.maxHeight,
                ...props.style
            }}
        >
            {props.children}
        </div>
    )
}

export default memo(BasePanel)