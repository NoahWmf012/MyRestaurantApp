import type { Rating, ReviewPrismaInterface } from "../../interfaces/schemaPrismaInterface";

// Helper functions
const formatDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getRatingEmoji = (rating: Rating): string => {
    const emojiMap = {
        GOOD: '👍',
        NORMAL: '👌',
        BAD: '👎'
    };
    return emojiMap[rating];
};

const getRatingLabel = (rating: Rating): string => {
    const labelMap = {
        GOOD: 'Good',
        NORMAL: 'Normal',
        BAD: 'Bad'
    };
    return labelMap[rating];
};

const getUserInitial = (userId: string): string => { //todo: add user.iconUrl
    return userId.charAt(0).toUpperCase();
};

const maskUserId = (userId: string): string => {
    return `User ${userId.slice(0, 8)}`;
}

// Review Item Component
interface ReviewItemProps {
    review: ReviewPrismaInterface;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
    return (
        <div className="review-item">
            <div className="review-header">
                <div className="review-author">
                    <div className="author-avatar">
                        {getUserInitial(review.userId)}
                    </div>
                    <div className="author-info">
                        <div className="author-name">{maskUserId(review.userId)}</div>
                        <div className="review-date">{formatDate(review.createdAt)}</div>
                    </div>
                </div>
                <div className={`review-rating rating-${review.rating.toLowerCase()}`}>
                    <span className="rating-emoji">{getRatingEmoji(review.rating)}</span>
                    <span className="rating-label">{getRatingLabel(review.rating)}</span>
                </div>
            </div>

            {review.title && (
                <h4 className="review-title">{review.title}</h4>
            )}

            {review.content && (
                <p className="review-content">{review.content}</p>
            )}
        </div>
    );
};
export default ReviewItem;