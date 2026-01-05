import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "../../components/ProtectedRoute";
import PollDetail from "../../components/vote/PollDetail";
import { PollList } from "../../components/vote/PollList";
import { useGetPollsQuery, useUpdateVoteMutation, useGetPollByShareTokenQuery } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';
import './VotePage.scss';
import { useAppSelector } from '../../redux/store';
import CreatePollModal from '../../components/vote/CreatePollModal';

interface LocationState {
    poll?: PollResponse;
    fromShare?: boolean;
}

function VotePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const isGuest = useAppSelector((state) => state.userInfoState.isGuest);

    const locationState = location.state as LocationState;
    const pollFromState = locationState?.poll;
    const fromShare = locationState?.fromShare;
    const shareToken = pollFromState?.shareToken;

    const { data: polls, isLoading: isLoadingPolls, isError: isErrorPolls, refetch: refetchPolls } = useGetPollsQuery(undefined, {
        skip: !!pollFromState
    });

    const { data: sharedPoll, isLoading: isLoadingShare, isError: isErrorShare, refetch: refetchSharedPoll } = useGetPollByShareTokenQuery(shareToken || '', {
        skip: !fromShare || !shareToken
    });

    const [updateVote] = useUpdateVoteMutation();

    const isLoading = isLoadingPolls || isLoadingShare;
    const isError = isErrorPolls || isErrorShare;

    // If poll data was passed from share link, use it directly
    useEffect(() => {
        if (pollFromState) {
            setSelectedPoll(pollFromState);
        }
    }, [pollFromState]);

    // Update selected poll when shared poll is refetched
    useEffect(() => {
        if (sharedPoll && fromShare) {
            setSelectedPoll(sharedPoll);
        }
    }, [sharedPoll, fromShare]);

    const handlePollClick = (poll: PollResponse) => {
        // Sort options by vote count when first entering the poll
        const sortedPoll = {
            ...poll,
            options: [...poll.options].sort((a, b) => b.votes.length - a.votes.length)
        };
        setSelectedPoll(sortedPoll);
    };

    const handleBackToList = () => {
        setSelectedPoll(null);
    };

    const handleVote = async (pollId: number, _restaurantId: number | null, optionId: number) => {
        try {
            await updateVote({ pollId, optionId }).unwrap();

            // If poll came from share link, refetch using share token
            if (fromShare && shareToken) {
                const { data: updatedSharedPoll } = await refetchSharedPoll();
                // Update selected poll if it's currently viewed, preserving current order
                if (selectedPoll && selectedPoll.id === pollId && updatedSharedPoll) {
                    const reorderedOptions = selectedPoll.options.map(currentOption => {
                        return updatedSharedPoll.options.find(
                            opt => opt.pollOptionId === currentOption.pollOptionId
                        )!;
                    });

                    setSelectedPoll({
                        ...updatedSharedPoll,
                        options: reorderedOptions
                    });
                }
            } else {
                // Otherwise refetch from the normal polls list
                const { data: updatedPolls } = await refetchPolls();
                // Update selected poll if it's currently viewed, preserving current order
                if (selectedPoll && selectedPoll.id === pollId && updatedPolls) {
                    const updatedPoll = updatedPolls.find(p => p.id === pollId);
                    if (updatedPoll) {
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
            }
        } catch (error) {
            console.error('Failed to submit vote:', error);
        }
    };

    const handleCreateSuccess = async () => {
        await refetchPolls();
        setShowCreateModal(false);
    };

    return (
        <ProtectedRoute>
            <div className="vote-page-container">
                {isLoading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading poll data...</p>
                    </div>
                )}

                {isError && (
                    <div className="error-state">
                        <h2>Error Loading Poll</h2>
                        <p>Unable to load poll data. Please try again later.</p>
                        <button onClick={() => navigate('/vote')}>Back to Polls</button>
                    </div>
                )}

                {!isLoading && !isError && selectedPoll && (
                    <PollDetail
                        poll={selectedPoll}
                        onVote={handleVote}
                        onBack={handleBackToList}
                    />
                )}

                {!isLoading && !isError && !selectedPoll && polls && (
                    <div className="vote-page-list">
                        <div className="flex justify-between items-center mb-8">
                            <h1>Polls</h1>
                            <button
                                className="btn btn-success"
                                onClick={() => setShowCreateModal(true)}
                                disabled={isGuest}
                            >
                                + Create New Poll
                            </button>
                        </div>
                        <PollList polls={polls} handlePollClick={handlePollClick} />
                    </div>
                )}

                {showCreateModal && <CreatePollModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleCreateSuccess}
                />}
            </div>
        </ProtectedRoute>
    );
}

export default VotePage;
