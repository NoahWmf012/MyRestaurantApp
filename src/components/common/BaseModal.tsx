
import { memo } from "react"

type BaseModalProps = {
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
}

function BaseModal(props: BaseModalProps) {

    return (
        <div className="modal-overlay" onClick={props.onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
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