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
import { getAppUrl } from '../../hooks/urlHook';

function VoteModal() {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
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
        } else {
            // setPolls(DUMMY_POLLS);
        }
    }, [votesData]);

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
        // Refetch polls to update the list
        await refetchPolls();
        setShowCreateModal(false);
    };

    const handleBackToList = () => {
        setSelectedPoll(null);
    };

    //Copy Poll Link handler
    const handleCopyPollLink = () => {
        if (selectedPoll) {
            const url = `${getAppUrl()}poll/share/${selectedPoll.shareToken}`;
            navigator.clipboard.writeText(url).then(() => {
                alert('Poll link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy link: ', err);
            });
        }
    };

    const handleVote = async (pollId: number, _restaurantId: number, optionId: number) => {
        try {
            await updateVote({ pollId, optionId }).unwrap();

            // Refetch polls to get the latest data from server
            const { data: updatedPolls } = await refetchPolls();

            // Update selected poll if it's currently viewed, but preserve the current order
            if (selectedPoll && selectedPoll.id === pollId && updatedPolls) {
                const updatedPoll = updatedPolls.find(p => p.id === pollId);
                if (updatedPoll) {
                    // Preserve the current options order by matching with the current selectedPoll order
                    const reorderedOptions = selectedPoll.options.map(currentOption => {
                        return updatedPoll.options.find(
                            opt => opt.restaurantId === currentOption.restaurantId
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

    if (!show) return null;

    function VoteModalContent() {
        if (selectedPoll) {
            return (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <button
                            className="btn btn-secondary"
                            onClick={handleBackToList}
                        >
                            ← Back to Polls
                        </button>

                        {/* A button that lets copy the url to clipboard */}
                        {/* Change text after copying */}
                        <button className="btn btn-outline-primary" onClick={handleCopyPollLink}>
                            Copy Poll Link
                        </button>
                    </div>

                    <PollDetail
                        poll={selectedPoll}
                        onVote={handleVote}
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