import BaseModal from "../common/BaseModal";
import { useCreatePollMutation } from "../../redux/services/api/voteAPI";
import type { CreatePollRequest } from "../../interfaces/queryInterface/pollAPIInterface";
import { useAppSelector } from "../../redux/store";

type CreatePollModalProps = {
    onClose: () => void;
    onSuccess: () => void;
};

function CreatePollModal({ onClose, onSuccess }: CreatePollModalProps) {
    const userId = useAppSelector((state) => state.userInfoState.userId);
    const DUMMY_POLLS: CreatePollRequest = {
        title: "Sample Poll",
        description: "This is a sample poll description.",
        createdBy: userId,
        expiresAt: new Date(),
        userIds: ["user1", "user2"],
        options: [
            { restaurantName: "Restaurant A" },
            { restaurantName: "Restaurant B" },
        ],
    }
    const [createPoll] = useCreatePollMutation();

    const handleCreatePoll = async () => {
        try {
            await createPoll(DUMMY_POLLS).unwrap();
            onSuccess();
        } catch (error) {
            console.error("Failed to create poll:", error);
        }
    };

    return (
        <>
            <BaseModal
                title="Create Vote Poll"
                onClose={onClose}
            >
                <div>
                    <h5>Create a New Poll</h5>
                    <button className="btn btn-primary" onClick={handleCreatePoll}>
                        Create Poll
                    </button>
                </div>
            </BaseModal>
        </>
    )
}

export default CreatePollModal