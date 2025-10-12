import type { CurrentUserInterface, Vote } from "../../constants/voteData";
import type { PollResponse } from "../../interfaces/queryInterface/pollAPIInterface";

type PollOptionsProps = {
    poll: PollResponse;
    currentUserVote: number | null;
    isExpired: boolean;
    handleVoteClick: (restaurantId: number, optionId: number) => void;
    currentUser: CurrentUserInterface;
};
export function PollOptions({ poll, currentUserVote, isExpired, handleVoteClick, currentUser }: PollOptionsProps) {
    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0);
    const getVotePercentage = (votes: Vote[]) => {
        if (totalVotes === 0) return 0;
        return Math.round((votes.length / totalVotes) * 100);
    };

    return poll.options.map((option, index) => {
        const percentage = getVotePercentage(option.votes);
        const isUserVote = currentUserVote === option.restaurantId;
        const isWinner = index === 0 && option.votes.length > 0;

        return (
            <div
                key={option.restaurantName}
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
                        onClick={() => handleVoteClick(option.restaurantId, option.pollOptionId)}
                        disabled={isUserVote}
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
    })
}