import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "../../components/ProtectedRoute";
import PollDetail from "../../components/vote/PollDetail";
import { useGetPollsQuery, useUpdateVoteMutation } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';

function VotePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pollId, setPollId] = useState<number | null>(null);
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);

    const { data: polls, isLoading, isError, refetch } = useGetPollsQuery();
    const [updateVote] = useUpdateVoteMutation();

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            const id = parseInt(hash, 10);
            if (!isNaN(id)) {
                setPollId(id);
            }
        }
    }, [location.hash]);

    useEffect(() => {
        if (polls && pollId) {
            const poll = polls.find((p: PollResponse) => p.id === pollId);
            if (poll) {
                setSelectedPoll(poll);
            } else {
                console.error('Poll with ID ' + pollId + ' not found');
            }
        }
    }, [polls, pollId]);

    const handleVote = async (pollId: number, _restaurantId: number, optionId: number) => {
        try {
            await updateVote({ pollId, optionId }).unwrap();
            await refetch();
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

                {!isLoading && !isError && !pollId && (
                    <div className="no-poll-selected">
                        <h2>No Poll Selected</h2>
                        <p>Please select a poll from the URL hash (e.g., /vote#123)</p>
                        <button onClick={() => navigate('/')}>Go Home</button>
                    </div>
                )}

                {!isLoading && !isError && pollId && !selectedPoll && (
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
