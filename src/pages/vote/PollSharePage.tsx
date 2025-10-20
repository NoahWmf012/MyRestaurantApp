import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useGetPollByShareTokenQuery } from '../../redux/services/api/voteAPI';
import { useAppSelector } from '../../redux/store';

/**
 * PollSharePage handles share links like: /poll/share/{shareToken}
 * 
 * Flow:
 * 1. If user is logged in -> fetch poll by share token -> redirect to VotePage with poll data
 * 2. If user is not logged in -> ProtectedRoute redirects to login -> after login, come back here -> fetch poll -> redirect to VotePage
 */
function PollSharePage() {
    const { shareToken } = useParams<{ shareToken: string }>();
    const navigate = useNavigate();
    const { accessToken } = useAppSelector(state => state.authState);

    const isAuthenticated = !!accessToken && accessToken.trim() !== '';

    // Only fetch poll data if user is authenticated and we have a shareToken
    const { data: poll, isLoading, isError, error } = useGetPollByShareTokenQuery(shareToken || '', {
        skip: !shareToken || !isAuthenticated, // Skip query if no token OR not authenticated
    });

    // Once we have the poll data, redirect to VotePage with the poll data in state
    useEffect(() => {
        if (poll) {
            navigate('/vote', {
                replace: true,
                state: {
                    poll: poll,
                    fromShare: true
                }
            });
        }
    }, [poll, navigate]);

    // Show loading message while waiting for authentication
    if (!isAuthenticated) {
        return (
            <ProtectedRoute>
                <div className="poll-share-page-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Checking authentication...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="poll-share-page-container">
                {isLoading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading poll from share link...</p>
                    </div>
                )}

                {isError && (
                    <div className="error-state">
                        <h2>⚠️ Error Loading Poll</h2>
                        <p>
                            {error && 'status' in error && error.status === 404
                                ? 'This poll does not exist or the share link has expired.'
                                : 'Unable to load poll. Please try again later.'}
                        </p>
                        <button onClick={() => navigate('/')}>Go Home</button>
                    </div>
                )}

                {!isLoading && !isError && !shareToken && (
                    <div className="error-state">
                        <h2>Invalid Share Link</h2>
                        <p>The share link is missing required information.</p>
                        <button onClick={() => navigate('/')}>Go Home</button>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}

export default PollSharePage;
