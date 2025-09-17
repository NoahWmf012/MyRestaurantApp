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
        <div className="poll-detail">
            <div className="poll-detail-info">
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

                        return (
                            <div
                                key={option.restaurantId}
                                className={`poll-option ${isUserVote ? 'user-voted' : ''} ${isExpired ? 'expired' : ''}`}
                            >
                                <div className="poll-option-header">
                                    <div className="restaurant-info">
                                        <span className="ranking">#{index + 1}</span>
                                        <h4 className="restaurant-name">{option.restaurantName}</h4>
                                        {isUserVote && <span className="your-vote-badge">Your Vote</span>}
                                    </div>
                                    <div className="vote-stats">
                                        <span className="vote-count">{option.votes.length} votes</span>
                                        <span className="vote-percentage">{percentage}%</span>
                                    </div>
                                </div>

                                <div className="vote-progress">
                                    <div
                                        className="vote-progress-bar"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>

                                {!isExpired && (
                                    <button
                                        className={`vote-button ${isUserVote ? 'voted' : ''}`}
                                        onClick={() => handleVoteClick(option.restaurantId)}
                                    >
                                        {isUserVote ? 'Change Vote' : 'Vote for This'}
                                    </button>
                                )}

                                {option.votes.length > 0 && (
                                    <div className="voters-list">
                                        <span className="voters-label">Voted by:</span>
                                        <div className="voters">
                                            {option.votes.map((vote, voteIndex) => (
                                                <span
                                                    key={`${vote.userId}-${voteIndex}`}
                                                    className={`voter ${vote.userId === currentUser.userId ? 'current-user' : ''}`}
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
                <div className="current-vote-info">
                    <p>You have voted for: <strong>{poll.options.find(o => o.restaurantId === currentUserVote)?.restaurantName}</strong></p>
                    <p className="vote-help-text">Click on any restaurant to change your vote.</p>
                </div>
            )}

            {!currentUserVote && !isExpired && (
                <div className="no-vote-info">
                    <p>You haven't voted yet. Click on a restaurant to cast your vote!</p>
                </div>
            )}
        </div>
    );
}

export default PollDetail;
