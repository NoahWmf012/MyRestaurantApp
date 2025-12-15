import { useState } from "react";
import type { Rating } from "../../interfaces/schemaPrismaInterface";
import BaseModal from "../../components/common/BaseModal";
import "./WriteReviewModal.scss";

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    restaurantName: string;
    onSubmit: (reviewData: ReviewFormData) => void;
}

export interface ReviewFormData {
    title: string;
    content: string;
    rating: Rating;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
    isOpen,
    onClose,
    restaurantName,
    onSubmit
}) => {
    const [formData, setFormData] = useState<ReviewFormData>({
        title: '',
        content: '',
        rating: 'GOOD' as Rating
    });

    const [errors, setErrors] = useState({
        title: '',
        content: '',
        rating: ''
    });

    const validateForm = (): boolean => {
        const newErrors = {
            title: '',
            content: '',
            rating: ''
        };

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Review content is required';
        } else if (formData.content.length < 10) {
            newErrors.content = 'Review must be at least 10 characters';
        }

        setErrors(newErrors);
        return !newErrors.title && !newErrors.content && !newErrors.rating;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({ title: '', content: '', rating: 'GOOD' as Rating });
        setErrors({ title: '', content: '', rating: '' });
        onClose();
    };

    const handleRatingChange = (rating: Rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    if (!isOpen) return null;

    return (
        <BaseModal
            title="Write a Review"
            onClose={handleClose}
            maxWidth="600px"
        >
            <div className="write-review-content">
                <p className="restaurant-name">for {restaurantName}</p>

                <form onSubmit={handleSubmit} className="review-form">
                    {/* Rating Selection */}
                    <div className="form-group">
                        <label className="form-label">Your Rating *</label>
                        <div className="rating-options">
                            <button
                                type="button"
                                className={`rating-option rating-good ${formData.rating === 'GOOD' ? 'selected' : ''}`}
                                onClick={() => handleRatingChange('GOOD' as Rating)}
                            >
                                <span className="rating-emoji">👍</span>
                                <span className="rating-text">Good</span>
                            </button>
                            <button
                                type="button"
                                className={`rating-option rating-normal ${formData.rating === 'NORMAL' ? 'selected' : ''}`}
                                onClick={() => handleRatingChange('NORMAL' as Rating)}
                            >
                                <span className="rating-emoji">👌</span>
                                <span className="rating-text">Normal</span>
                            </button>
                            <button
                                type="button"
                                className={`rating-option rating-bad ${formData.rating === 'BAD' ? 'selected' : ''}`}
                                onClick={() => handleRatingChange('BAD' as Rating)}
                            >
                                <span className="rating-emoji">👎</span>
                                <span className="rating-text">Bad</span>
                            </button>
                        </div>
                        {errors.rating && <span className="form-error">{errors.rating}</span>}
                    </div>

                    {/* Title Input */}
                    <div className="form-group">
                        <label htmlFor="review-title" className="form-label">
                            Review Title *
                        </label>
                        <input
                            id="review-title"
                            type="text"
                            className={`form-input ${errors.title ? 'error' : ''}`}
                            placeholder="Summarize your experience"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            maxLength={100}
                        />
                        {errors.title && <span className="form-error">{errors.title}</span>}
                        <span className="character-count">{formData.title.length}/100</span>
                    </div>

                    {/* Content Textarea */}
                    <div className="form-group">
                        <label htmlFor="review-content" className="form-label">
                            Your Review *
                        </label>
                        <textarea
                            id="review-content"
                            className={`form-textarea ${errors.content ? 'error' : ''}`}
                            placeholder="Share your experience with others..."
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            rows={6}
                            maxLength={1000}
                        />
                        {errors.content && <span className="form-error">{errors.content}</span>}
                        <span className="character-count">{formData.content.length}/1000</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
};

export default WriteReviewModal;
