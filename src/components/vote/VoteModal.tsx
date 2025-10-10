import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { hideVoteModal } from '../../redux/reducers/modalVisibleSlice';
import { CURRENT_USER, DUMMY_POLLS } from '../../constants/voteData';
import PollDetail from './PollDetail';
import './VoteModal.scss';
import { PollList } from './PollList';
import BaseModal from '../common/BaseModal';
import CreatePollModal from './CreatePollModal';
import { useGetPollsQuery } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';

function VoteModal() {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
    const dispatch = useAppDispatch();
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);
    const [polls, setPolls] = useState([] as PollResponse[]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data: votesData, refetch: refetchPolls } = useGetPollsQuery()

    const isGuest = useAppSelector((state) => state.userInfoState.isGuest);

    useEffect(() => {
        if (votesData) {
            setPolls(votesData);
        } else {
            setPolls(DUMMY_POLLS);
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
    };

    const handleBackToList = () => {
        setSelectedPoll(null);
    };

    const handleVote = (pollId: number, restaurantId: number) => {
        setPolls(prevPolls =>
            prevPolls.map(poll => {
                if (poll.id !== pollId) return poll;

                return {
                    ...poll,
                    options: poll.options.map(option => {
                        // Remove user's previous vote from all options
                        const filteredVotes = option.votes.filter(vote => vote.userId !== CURRENT_USER.userId);

                        // Add vote to the selected restaurant
                        if (option.restaurantId === restaurantId) {
                            return {
                                ...option,
                                votes: [...filteredVotes, {
                                    userId: CURRENT_USER.userId,
                                    userName: CURRENT_USER.userName,
                                    restaurantId
                                }]
                            };
                        }

                        return {
                            ...option,
                            votes: filteredVotes
                        };
                    })
                };
            })
        );

        // Update selected poll if it's currently viewed
        if (selectedPoll && selectedPoll.id === pollId) {
            const updatedPoll = polls.find(p => p.id === pollId);
            if (updatedPoll) {
                setSelectedPoll(updatedPoll);
            }
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
                        currentUser={CURRENT_USER}
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