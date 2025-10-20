import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "../../components/ProtectedRoute";
import PollDetail from "../../components/vote/PollDetail";
import { useGetPollsQuery, useUpdateVoteMutation, useGetPollByShareTokenQuery } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';
import './VotePage.scss';

interface LocationState {
    poll?: PollResponse;
    fromShare?: boolean;
}

function VotePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pollId, setPollId] = useState<number | null>(null);
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);

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

    // Extract poll ID from URL hash (e.g., /vote#123) - only if no poll from state
    useEffect(() => {
        if (!pollFromState) {
            const hash = location.hash.replace('#', '');
            if (hash) {
                const id = parseInt(hash, 10);
                if (!isNaN(id)) {
                    setPollId(id);
                }
            }
        }
    }, [location.hash, pollFromState]);

    // Find the selected poll from fetched polls - only if no poll from state
    useEffect(() => {
        if (!pollFromState && polls && pollId) {
            const poll = polls.find((p: PollResponse) => p.id === pollId);
            if (poll) {
                setSelectedPoll(poll);
            } else {
                console.error('Poll with ID ' + pollId + ' not found');
            }
        }
    }, [polls, pollId, pollFromState]);

    const handleVote = async (pollId: number, _restaurantId: number, optionId: number) => {
        try {
            await updateVote({ pollId, optionId }).unwrap();

            // If poll came from share link, refetch using share token
            if (fromShare && shareToken) {
                await refetchSharedPoll();
            } else {
                // Otherwise refetch from the normal polls list
                await refetchPolls();
            }
        } catch (error) {
            console.error('Failed to submit vote:', error);
        }
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

                {!isLoading && !isError && !pollId && !pollFromState && (
                    <div className="no-poll-selected">
                        <h2>No Poll Selected</h2>
                        <p>Please select a poll from the URL hash (e.g., /vote#123)</p>
                        <button onClick={() => navigate('/')}>Go Home</button>
                    </div>
                )}

                {!isLoading && !isError && pollId && !selectedPoll && !pollFromState && (
                    <div className="poll-not-found">
                        <h2>Poll Not Found</h2>
                        <p>The poll with ID {pollId} could not be found.</p>
                        <button onClick={() => navigate('/')}>Go Home</button>
                    </div>
                )}

                {selectedPoll && (
                    <PollDetail
                        poll={selectedPoll}
                        onVote={handleVote}
                    />
                )}
            </div>
        </ProtectedRoute>
    );
}

export default VotePage;
