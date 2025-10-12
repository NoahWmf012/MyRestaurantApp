import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { hideVoteModal } from '../../redux/reducers/modalVisibleSlice';
import PollDetail from './PollDetail';
import './VoteModal.scss';
import { PollList } from './PollList';
import BaseModal from '../common/BaseModal';
import CreatePollModal from './CreatePollModal';
import { useGetPollsQuery, useUpdateVoteMutation } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';

function VoteModal() {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
    const dispatch = useAppDispatch();
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);
    const [polls, setPolls] = useState([] as PollResponse[]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    //get user info from redux/local storage
    const currentUser = useAppSelector((state) => state.userInfoState);

    const { data: votesData, refetch: refetchPolls } = useGetPollsQuery()
    const [triggerVoteUpdate] = useUpdateVoteMutation();

    const isGuest = useAppSelector((state) => state.userInfoState.isGuest);

    useEffect(() => {
        if (votesData) {
            setPolls(votesData);
        } else {
            // setPolls(DUMMY_POLLS);
        }
    }, [votesData]);

    const onClose = () => {
        dispatch(hideVoteModal());
        setSelectedPoll(null);
    };

    const handlePollClick = (poll: PollResponse) => {
        setSelectedPoll(poll);
    };

    const handleCreateSuccess = async () => {
        // Refetch polls to update the list
        await refetchPolls();
        setShowCreateModal(false);
    };

    const handleBackToList = () => {
        setSelectedPoll(null);
    };

    const handleVote = async (pollId: number, _restaurantId: number, optionId: number) => {
        try {
            // Trigger backend vote update
            await triggerVoteUpdate({ pollId, optionId }).unwrap();

            // Refetch polls to get the latest data from server
            const { data: updatedPolls } = await refetchPolls();

            // Update selected poll if it's currently viewed
            if (selectedPoll && selectedPoll.id === pollId && updatedPolls) {
                const updatedPoll = updatedPolls.find(p => p.id === pollId);
                if (updatedPoll) {
                    setSelectedPoll(updatedPoll);
                }
            }
        } catch (error) {
            console.error('Failed to update vote:', error);
        }
    };

    if (!show) return null;

    function VoteModalContent() {
        if (selectedPoll) {
            return (
                <div>
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={handleBackToList}
                    >
                        ← Back to Polls
                    </button>
                    <PollDetail
                        poll={selectedPoll}
                        onVote={handleVote}
                        currentUser={currentUser}
                    />
                </div>
            );
        }

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Active Polls</h5>
                    <button
                        className="btn btn-success"
                        onClick={() => setShowCreateModal(true)}
                        disabled={isGuest}
                    >
                        + Create New Poll
                    </button>
                </div>
                <PollList
                    polls={polls}
                    handlePollClick={handlePollClick}
                />
            </div>
        );
    };

    return (
        <>
            <BaseModal
                title="Restaurant Voting"
                onClose={onClose}
            >
                <VoteModalContent />
            </BaseModal>

            {showCreateModal && <CreatePollModal
                onClose={() => setShowCreateModal(false)}
                onSuccess={handleCreateSuccess}
            />}

        </>
    );
}

export default VoteModal;