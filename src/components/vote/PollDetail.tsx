import { type Poll, type Vote } from '../../constants/voteData';

interface PollDetailProps {
    poll: Poll;
    onVote: (pollId: number, restaurantId: number) => void;
    currentUser: {
        userId: string;
        userName: string;
    };
}

function PollDetail({ poll, onVote, currentUser }: PollDetailProps) {
    const isExpired = !poll.isActive || new Date(poll.expiresAt) < new Date();

    const getUserVote = (): number | null => {
        for (const option of poll.options) {
            const userVote = option.votes.find(vote => vote.userId === currentUser.userId);
            if (userVote) {
                return option.restaurantId;
            }
        }
        return null;
    };

    const currentUserVote = getUserVote();
    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0);

    const getVotePercentage = (votes: Vote[]) => {
        if (totalVotes === 0) return 0;
        return Math.round((votes.length / totalVotes) * 100);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleVoteClick = (restaurantId: number) => {
        if (isExpired) return;
        onVote(poll.id, restaurantId);
    };

    return (
        <div className="modern-poll-detail">
            <div className="modern-poll-info">
                <div className="poll-info-header">
                    <div className="poll-info-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="poll-info-title">Poll Details</h3>
                        <p className="poll-description">{poll.description}</p>
                    </div>
                </div>

                <div className="poll-meta-grid">
                    <div className="poll-meta-item">
                        <svg className="poll-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                            <span className="poll-meta-label">Created by</span>
                            <span className="poll-meta-value">{poll.createdBy}</span>
                        </div>
                    </div>

                    <div className="poll-meta-item">
                        <svg className="poll-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                        </svg>
                        <div>
                            <span className="poll-meta-label">Expires</span>
                            <span className="poll-meta-value">{formatDate(poll.expiresAt)}</span>
                        </div>
                    </div>

                    <div className="poll-meta-item">
                        <svg className="poll-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <div>
                            <span className="poll-meta-label">Total votes</span>
                            <span className="poll-meta-value">{totalVotes}</span>
                        </div>
                    </div>
                </div>

                {isExpired && (
                    <div className="modern-poll-expired-notice">
                        <svg className="expired-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>This poll has expired and voting is no longer available.</span>
                    </div>
                )}
            </div>

            <div className="modern-poll-options">
                <div className="poll-options-header">
                    <h3>🏆 Restaurant Rankings</h3>
                    <span className="total-votes-badge">{totalVotes} votes</span>
                </div>
                <p className="poll-description">{poll.description}</p>
                <div className="poll-meta">
                    <span className="poll-creator">Created by {poll.createdBy}</span>
                    <span className="poll-created">Created: {formatDate(poll.createdAt)}</span>
                    <span className="poll-expires">Expires: {formatDate(poll.expiresAt)}</span>
                    <span className="poll-total-votes">{totalVotes} total votes</span>
                </div>
                {isExpired && (
                    <div className="poll-expired-notice">
                        This poll has expired and voting is no longer available.
                    </div>
                )}
            </div>

            <div className="poll-options">
                <h3>Restaurant Options</h3>
                {poll.options
                    .sort((a, b) => b.votes.length - a.votes.length) // Sort by vote count (highest first)
                    .map((option, index) => {
                        const percentage = getVotePercentage(option.votes);
                        const isUserVote = currentUserVote === option.restaurantId;
                        const isWinner = index === 0 && option.votes.length > 0;

                        return (
                            <div
                                key={option.restaurantId}
                                className={`modern-poll-option ${isUserVote ? 'modern-poll-option--voted' : ''} ${isExpired ? 'modern-poll-option--expired' : ''} ${isWinner ? 'modern-poll-option--winner' : ''}`}
                            >
                                <div className="poll-option-header">
                                    <div className="restaurant-info">
                                        <div className={`ranking-badge ${isWinner ? 'ranking-badge--winner' : ''}`}>
                                            {isWinner ? '👑' : `#${index + 1}`}
                                        </div>
                                        <div className="restaurant-details">
                                            <h4 className="restaurant-name">{option.restaurantName}</h4>
                                            {isUserVote && (
                                                <span className="your-vote-badge">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Your Vote
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="vote-stats">
                                        <span className="vote-count">{option.votes.length}</span>
                                        <span className="vote-percentage">{percentage}%</span>
                                    </div>
                                </div>

                                <div className="modern-vote-progress">
                                    <div className="vote-progress-track">
                                        <div
                                            className={`vote-progress-fill ${isUserVote ? 'vote-progress-fill--user' : ''} ${isWinner ? 'vote-progress-fill--winner' : ''}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {!isExpired && (
                                    <button
                                        className={`modern-vote-button ${isUserVote ? 'modern-vote-button--voted' : ''}`}
                                        onClick={() => handleVoteClick(option.restaurantId)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            {isUserVote ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            )}
                                        </svg>
                                        {isUserVote ? 'Change Vote' : 'Vote for This'}
                                    </button>
                                )}

                                {option.votes.length > 0 && (
                                    <div className="modern-voters-list">
                                        <span className="voters-label">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Voters ({option.votes.length})
                                        </span>
                                        <div className="voters-grid">
                                            {option.votes.map((vote, voteIndex) => (
                                                <span
                                                    key={`${vote.userId}-${voteIndex}`}
                                                    className={`modern-voter ${vote.userId === currentUser.userId ? 'modern-voter--current' : ''}`}
                                                >
                                                    {vote.userName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>

            {currentUserVote && !isExpired && (
                <div className="modern-vote-status modern-vote-status--success">
                    <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p><strong>You voted for: {poll.options.find(o => o.restaurantId === currentUserVote)?.restaurantName}</strong></p>
                        <p className="status-help-text">Click on any restaurant above to change your vote.</p>
                    </div>
                </div>
            )}

            {!currentUserVote && !isExpired && (
                <div className="modern-vote-status modern-vote-status--info">
                    <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p><strong>Ready to vote?</strong></p>
                        <p className="status-help-text">Click on any restaurant to cast your vote!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PollDetail;
