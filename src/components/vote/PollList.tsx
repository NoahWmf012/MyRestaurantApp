import type { PollResponse } from "../../interfaces/queryInterface/pollAPIInterface";

export function PollList({ polls, handlePollClick }: { polls: PollResponse[]; handlePollClick: (poll: PollResponse) => void }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTotalVotes = (poll: PollResponse) => {
        return poll.options.reduce((total, option) => total + option.votes.length, 0);
    };

    const getTimeRemaining = (expiresAt: string) => {
        const now = new Date();
        const expires = new Date(expiresAt);
        const diff = expires.getTime() - now.getTime();

        if (diff <= 0) return 'Expired';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
        return 'Expiring soon';
    };

    return (
        <div className="polls-list">
            {polls.length === 0 ? (
                <div className="no-polls">
                    <div className="no-polls-icon">🗳️</div>
                    <h3>No Active Polls</h3>
                    <p>There are no polls available at the moment. Check back later or create one!</p>
                </div>
            ) : (
                polls.map(poll => {
                    const totalVotes = getTotalVotes(poll);
                    const timeRemaining = getTimeRemaining(poll.expiresAt);

                    const isExpired = !poll.isActive || new Date(poll.expiresAt) < new Date();

                    return (
                        <div
                            key={poll.id}
                            className={`poll-card ${isExpired ? 'poll-card--expired' : ''}`}
                            onClick={() => handlePollClick(poll)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handlePollClick(poll);
                                }
                            }}
                        >
                            <div className="poll-card__header">
                                <div className="poll-card__title-section">
                                    <h3 className="poll-card__title">{poll.title}</h3>
                                    <span className={`poll-status poll-status--${isExpired ? 'expired' : 'active'}`}>
                                        <span className="poll-status__dot"></span>
                                        {isExpired ? 'Expired' : 'Active'}
                                    </span>
                                </div>
                                <div className="poll-card__arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <p className="poll-card__description">{poll.description}</p>

                            <div className="poll-card__stats">
                                <div className="poll-stat">
                                    <svg className="poll-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="poll-stat__value">{totalVotes}</span>
                                    <span className="poll-stat__label">vote{totalVotes !== 1 ? 's' : ''}</span>
                                </div>

                                <div className="poll-stat">
                                    <svg className="poll-stat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12,6 12,12 16,14" />
                                    </svg>
                                    <span className="poll-stat__value">{timeRemaining}</span>
                                </div>
                            </div>

                            <div className="poll-card__footer">
                                <div className="poll-card__creator">
                                    <svg className="poll-creator__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Created by <strong>{poll.createdBy}</strong></span>
                                </div>
                                <div className="poll-card__date">
                                    <span className="poll-date__label">Expires:</span>
                                    <span className="poll-date__value">{formatDate(poll.expiresAt)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}