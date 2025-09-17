import type { Poll } from "../../constants/voteData";

export function PollList({ polls, handlePollClick }: { polls: Poll[]; handlePollClick: (poll: Poll) => void }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTotalVotes = (poll: Poll) => {
        return poll.options.reduce((total, option) => total + option.votes.length, 0);
    };
    return (
        <div className="polls-list">
            {polls.length === 0 ? (
                <div className="no-polls">
                    <p>No polls available at the moment.</p>
                </div>
            ) : (
                polls.map(poll => (
                    <div
                        key={poll.id}
                        className={`poll-item ${!poll.isActive ? 'poll-expired' : ''}`}
                        onClick={() => handlePollClick(poll)}
                    >
                        <div className="poll-header">
                            <h3>{poll.title}</h3>
                            <span className={`poll-status ${poll.isActive ? 'active' : 'expired'}`}>
                                {poll.isActive ? 'Active' : 'Expired'}
                            </span>
                        </div>
                        <p className="poll-description">{poll.description}</p>
                        <div className="poll-meta">
                            <span className="poll-creator">Created by {poll.createdBy}</span>
                            <span className="poll-votes">{getTotalVotes(poll)} votes</span>
                            <span className="poll-expires">
                                Expires: {formatDate(poll.expiresAt)}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}