import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "../../components/ProtectedRoute";
import PollDetail from "../../components/vote/PollDetail";
import { useGetPollsQuery, useUpdateVoteMutation } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';

interface LocationState {
    poll?: PollResponse;
    fromShare?: boolean;
}

function VotePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pollId, setPollId] = useState<number | null>(null);
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);

    // Check if poll data was passed via navigation state (from share link)
    const locationState = location.state as LocationState;
    const pollFromState = locationState?.poll;
    const fromShare = locationState?.fromShare;

    // Only fetch all polls if we don't have poll data from state
    const { data: polls, isLoading, isError, refetch } = useGetPollsQuery(undefined, {
        skip: !!pollFromState // Skip fetching if we already have poll data
    });
    const [updateVote] = useUpdateVoteMutation();

    // If poll data was passed from share link, use it directly
    useEffect(() => {
        if (pollFromState) {
            console.log('📨 Poll data received from share link');
            setSelectedPoll(pollFromState);
        }
    }, [pollFromState]);

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

            // If poll came from share link, we need to refetch using share token
            if (fromShare && selectedPoll?.shareToken) {
                // Refetch the poll using its share token to get updated data
                const shareToken = selectedPoll.shareToken;
                // We'll trigger a re-navigation to refresh the data
                navigate(`/poll/share/${shareToken}`, { replace: true });
            } else {
                // Otherwise refetch from the normal polls list
                await refetch();
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
