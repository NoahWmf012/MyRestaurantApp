import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { hideVoteModal } from '../../redux/reducers/modalVisibleSlice';
import PollDetail from './PollDetail';
import { PollList } from './PollList';
import BaseModal from '../common/BaseModal';
import CreatePollModal from './CreatePollModal';
import { useGetPollsQuery, useUpdateVoteMutation } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';
import './VoteModal.scss';

function VoteModal() {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
    const { accessToken } = useAppSelector(state => state.authState);
    const dispatch = useAppDispatch();
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);
    const [polls, setPolls] = useState([] as PollResponse[]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data: votesData, refetch: refetchPolls } = useGetPollsQuery()
    const [updateVote] = useUpdateVoteMutation();

    const isGuest = useAppSelector((state) => state.userInfoState.isGuest);

    useEffect(() => {
        if (votesData) {
            setPolls(votesData);
        }
    }, [votesData]);

    // useEffect(() => {
    //     if (error) {
    //         console.error('Error fetching polls:', error); // handled in keycloak.ts
    //     }
    // }, [error]);

    const onClose = () => {
        dispatch(hideVoteModal());
        setSelectedPoll(null);
    };

    const handlePollClick = (poll: PollResponse) => {
        // Sort options by vote count when first entering the poll
        const sortedPoll = {
            ...poll,
            options: [...poll.options].sort((a, b) => b.votes.length - a.votes.length)
        };
        setSelectedPoll(sortedPoll);
    };

    const handleCreateSuccess = async () => {
        await refetchPolls();
        setShowCreateModal(false);
    };

    const handleBackToList = () => {
        setSelectedPoll(null);
    };

    const handleVote = async (pollId: number, _restaurantId: number | null, optionId: number) => {
        try {
            await updateVote({ pollId, optionId }).unwrap();

            const { data: updatedPolls } = await refetchPolls();

            // Update selected poll if it's currently viewed, but preserve the current order
            if (selectedPoll && selectedPoll.id === pollId && updatedPolls) {
                const updatedPoll = updatedPolls.find(p => p.id === pollId);
                if (updatedPoll) {
                    // Preserve the current options order by matching with the current selectedPoll order
                    const reorderedOptions = selectedPoll.options.map(currentOption => {
                        return updatedPoll.options.find(
                            opt => opt.pollOptionId === currentOption.pollOptionId
                        )!;
                    });

                    setSelectedPoll({
                        ...updatedPoll,
                        options: reorderedOptions
                    });
                }
            }
        } catch (error) {
            console.error('Failed to update vote:', error);
        }
    };

    if (!show || !accessToken) return null;

    function VoteModalContent() {
        if (selectedPoll) {
            return (
                <div>
                    <PollDetail
                        poll={selectedPoll}
                        onVote={handleVote}
                        onBack={handleBackToList}
                    />
                </div>
            );
        }

        return (
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h5>Polls</h5>
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