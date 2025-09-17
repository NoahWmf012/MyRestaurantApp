import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { hideVoteModal } from '../../redux/reducers/modalVisibleSlice';
import { DUMMY_POLLS, CURRENT_USER, type Poll } from '../../constants/voteData';
import PollDetail from './PollDetail';
import './VoteModal.scss';
import { PollList } from './PollList';

function VoteModal() {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
    const dispatch = useAppDispatch();
    const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
    const [polls, setPolls] = useState<Poll[]>(DUMMY_POLLS);

    const onClose = () => {
        dispatch(hideVoteModal());
        setSelectedPoll(null);
    };

    const handlePollClick = (poll: Poll) => {
        setSelectedPoll(poll);
    };

    const handleBackToPollList = () => {
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

    return (
        <div className="vote-modal-overlay" onClick={onClose}>
            <div className="vote-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="vote-modal-header">
                    {selectedPoll ? (
                        <div className="vote-modal-header-back">
                            <button
                                className="vote-back-button"
                                onClick={handleBackToPollList}
                            >
                                ← Back to Polls
                            </button>
                            <h2>{selectedPoll.title}</h2>
                        </div>
                    ) : (
                        <h2>Vote for Your Favorite Restaurant</h2>
                    )}
                    <button className="vote-modal-close" onClick={onClose}>×</button>
                </div>

                <div className="vote-modal-body">
                    {selectedPoll ?
                        <PollDetail
                            poll={selectedPoll}
                            onVote={handleVote}
                            currentUser={CURRENT_USER}
                        /> : <PollList
                            polls={polls}
                            handlePollClick={handlePollClick}
                        />}
                </div>
            </div>
        </div>
    );
}

export default VoteModal;
