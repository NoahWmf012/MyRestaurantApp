import { memo } from "react"

type BasePanelProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    isOpen?: boolean;
    onClose?: () => void;
}

function BaseRightSidePanel(props: BasePanelProps) {
    const { isOpen = true, onClose } = props;

    return (
        <>
            {/* Backdrop overlay */}
            {isOpen && onClose && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            {/* Sidebar panel */}
            <div
                className={`base-right-side-panel ${props.className || ''} ${isOpen ? 'open' : ''}`}
                style={{
                    ...props.style
                }}
            >
                {props.children}
            </div>
        </>
    )
}

export default memo(BaseRightSidePanel)