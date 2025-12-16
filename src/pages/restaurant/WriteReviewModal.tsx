import { useState } from "react";
import type { Rating } from "../../interfaces/schemaPrismaInterface";
import BaseModal from "../../components/common/BaseModal";
import { usePostRestaurantReviewMutation } from "../../redux/services/api/restaurantAPI";
import "./WriteReviewModal.scss";

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    restaurantId: number;
}

type ReviewStep = 'rating' | 'details';

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
    isOpen,
    onClose,
    restaurantId,
}) => {
    const [currentStep, setCurrentStep] = useState<ReviewStep>('rating');
    const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        content: '',
    });

    const [postReview, { isLoading }] = usePostRestaurantReviewMutation();

    const validateDetailsForm = (): boolean => {
        const newErrors = {
            title: '',
            content: '',
        };

        if (title.trim() && title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        if (content.trim() && content.length < 10) {
            newErrors.content = 'Review must be at least 10 characters';
        }

        setErrors(newErrors);
        return !newErrors.title && !newErrors.content;
    };

    const handleRatingSelect = (rating: Rating) => {
        setSelectedRating(rating);
        setCurrentStep('details');
    };

    const handleBack = () => {
        setCurrentStep('rating');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedRating) return;

        if (!validateDetailsForm()) return;

        try {
            await postReview({
                restaurantId,
                rating: selectedRating,
                title: title.trim() || undefined,
                content: content.trim() || undefined,
            }).unwrap();

            // Success - reset state and close modal
            setCurrentStep('rating');
            setSelectedRating(null);
            setTitle('');
            setContent('');
            setErrors({ title: '', content: '' });
            onClose();
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    const handleClose = async () => {
        // Auto-submit if user selected a rating
        if (selectedRating) {
            if (validateDetailsForm()) {
                try {
                    await postReview({
                        restaurantId,
                        rating: selectedRating,
                        title: title.trim() || undefined,
                        content: content.trim() || undefined,
                    }).unwrap();
                    alert('Review submitted successfully!');
                } catch (error) {
                    console.error('Failed to submit review:', error);
                    alert('Failed to submit review. Please try again.');
                }
            }
        }

        // Reset state
        setCurrentStep('rating');
        setSelectedRating(null);
        setTitle('');
        setContent('');
        setErrors({ title: '', content: '' });
        onClose();
    };

    if (!isOpen) return null;

    const getRatingEmoji = (rating: Rating): string => {
        const emojiMap = { GOOD: '👍', NORMAL: '👌', BAD: '👎' };
        return emojiMap[rating];
    };

    const getRatingLabel = (rating: Rating): string => {
        const labelMap = { GOOD: 'Good', NORMAL: 'Normal', BAD: 'Bad' };
        return labelMap[rating];
    };

    return (
        <BaseModal
            title={currentStep === 'rating' ? 'Rate Your Experience' : 'Write Your Review'}
            onClose={handleClose}
            maxWidth="600px"
            hideCloseButton={true}
        >
            <div className="write-review-content">
                {/* Step 1: Rating Selection */}
                {currentStep === 'rating' && (
                    <div className="rating-step">
                        <p className="step-description">How was your experience?</p>
                        <div className="rating-options">
                            <button
                                type="button"
                                className="rating-option rating-good"
                                onClick={() => handleRatingSelect('GOOD' as Rating)}
                            >
                                <span className="rating-emoji">👍</span>
                                <span className="rating-text">Good</span>
                            </button>
                            <button
                                type="button"
                                className="rating-option rating-normal"
                                onClick={() => handleRatingSelect('NORMAL' as Rating)}
                            >
                                <span className="rating-emoji">👌</span>
                                <span className="rating-text">Normal</span>
                            </button>
                            <button
                                type="button"
                                className="rating-option rating-bad"
                                onClick={() => handleRatingSelect('BAD' as Rating)}
                            >
                                <span className="rating-emoji">👎</span>
                                <span className="rating-text">Bad</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Details Form */}
                {currentStep === 'details' && selectedRating && (
                    <div className="details-step">
                        <div className="selected-rating-display">
                            <span className="rating-label">Your Rating:</span>
                            <span className={`rating-badge rating-${selectedRating.toLowerCase()}`}>
                                {getRatingEmoji(selectedRating)} {getRatingLabel(selectedRating)}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="review-form">
                            {/* Title Input */}
                            <div className="form-group">
                                <label htmlFor="review-title" className="form-label">
                                    Review Title (Optional)
                                </label>
                                <input
                                    id="review-title"
                                    type="text"
                                    className={`form-input ${errors.title ? 'error' : ''}`}
                                    placeholder="Summarize your experience"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={100}
                                />
                                {errors.title && <span className="form-error">{errors.title}</span>}
                                <span className="character-count">{title.length}/100</span>
                            </div>

                            {/* Content Textarea */}
                            <div className="form-group">
                                <label htmlFor="review-content" className="form-label">
                                    Your Review (Optional)
                                </label>
                                <textarea
                                    id="review-content"
                                    className={`form-textarea ${errors.content ? 'error' : ''}`}
                                    placeholder="Share your experience with others..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={6}
                                    maxLength={1000}
                                />
                                {errors.content && <span className="form-error">{errors.content}</span>}
                                <span className="character-count">{content.length}/1000</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="modal-actions">
                                <button type="button" className="btn-back" onClick={handleBack}>
                                    ← Back
                                </button>
                                <button type="submit" className="btn-submit" disabled={isLoading}>
                                    {isLoading ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </BaseModal>
    );
};

export default WriteReviewModal;
