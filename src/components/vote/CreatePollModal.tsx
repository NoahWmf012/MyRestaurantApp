import BaseModal from "../common/BaseModal";
import { useCreatePollMutation } from "../../redux/services/api/voteAPI";
import type { CreatePollRequest } from "../../interfaces/queryInterface/pollAPIInterface";
// import { useAppSelector } from "../../redux/store";
import { useForm } from "react-hook-form";
import { createVoteValidation } from "../../validations/vote.validation";
import { yupResolver } from "@hookform/resolvers/yup";

type CreatePollModalProps = {
    onClose: () => void;
    onSuccess: () => void;
};

function CreatePollModal({ onClose, onSuccess }: CreatePollModalProps) {
    // const userId = useAppSelector((state) => state.userInfoState.userId);
    // const DUMMY_POLLS: CreatePollRequest = {
    //     title: "Sample Poll",
    //     description: "This is a sample poll description.",
    //     expiresAt: new Date(),
    //     options: [
    //         { restaurantName: "Restaurant A" },
    //         { restaurantName: "Restaurant B" },
    //     ],
    // }
    const [createPoll] = useCreatePollMutation();

    const handleCreatePoll = async (data: CreatePollRequest) => {
        try {
            await createPoll(data).unwrap();
            onSuccess();
        } catch (error) {
            console.error("Failed to create poll:", error);
            setCreatePollError("root", { message: "Failed to create poll. Please try again." });
        }
    };

    // React Hook Form
    const {
        register: registerCreatePoll,
        handleSubmit: handleCreatePollSubmit,
        formState: { errors: createPollErrors, isSubmitting },
        setError: setCreatePollError
    } = useForm({
        resolver: yupResolver(createVoteValidation),
    });

    return (
        <>
            <BaseModal
                title="Create Vote Poll"
                onClose={onClose}
            >
                <div className="auth-container">
                    <div className="auth-card">
                        <form className="auth-form" onSubmit={handleCreatePollSubmit(handleCreatePoll)}>
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <div className="title-wrapper">
                                    <input
                                        id="poll-title"
                                        {...registerCreatePoll('title')}
                                        placeholder="Write your poll title"
                                        className={"form-input has-icon"}
                                        autoComplete="title"
                                    />
                                </div>
                                {createPollErrors.title && (
                                    <div className="form-error">
                                        <span className="error-icon">⚠</span>
                                        {createPollErrors.title.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <div className="description-wrapper">
                                    <input
                                        id="poll-title"
                                        {...registerCreatePoll('title')}
                                        placeholder="Write your poll title"
                                        className={"form-input has-icon"}
                                        autoComplete="title"
                                    />
                                </div>
                                {createPollErrors.description && (
                                    <div className="form-error">
                                        <span className="error-icon">⚠</span>
                                        {createPollErrors.description.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="expiresAt" className="form-label">
                                    Expires At
                                </label>
                                <div className="expiresAt-wrapper">
                                    <input
                                        id="poll-expiresAt"
                                        {...registerCreatePoll('expiresAt')}
                                        type="datetime-local"
                                        className={"form-input has-icon"}
                                        autoComplete="expiresAt"
                                    />
                                </div>
                                {createPollErrors.expiresAt && (
                                    <div className="form-error">
                                        <span className="error-icon">⚠</span>
                                        {createPollErrors.expiresAt.message}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="options" className="form-label">
                                    Restaurants
                                </label>
                                <div className="options-wrapper">
                                    <input
                                        id="poll-options"
                                        {...registerCreatePoll('options')}
                                        placeholder="Write your poll options"
                                        className={"form-input has-icon"}
                                        autoComplete="options"
                                    />
                                </div>
                                {createPollErrors.options && (
                                    <div className="form-error">
                                        <span className="error-icon">⚠</span>
                                        {createPollErrors.options.message}
                                    </div>
                                )}
                            </div>

                            {/* submit button */}
                            <button type="submit" className="auth-button" disabled={isSubmitting}>
                                Create Poll
                            </button>
                        </form>
                    </div>
                </div>
            </BaseModal>
        </>
    )
}

export default CreatePollModal