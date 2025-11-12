
import { memo } from "react"
import "./CommonStyle.style.scss"

type BaseModalProps = {
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
}

function BaseModal(props: BaseModalProps) {

    return (
        <div className="modal-overlay" onClick={props.onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ width: props.width, minWidth: props.minWidth, maxWidth: props.maxWidth }}>
                <div className="modal-header">
                    <h2>{props.title}</h2>
                    <button className="modal-close" onClick={props.onClose}>×</button>
                </div>

                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default memo(BaseModal)