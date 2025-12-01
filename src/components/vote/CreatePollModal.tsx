import { useEffect } from "react";
import BaseModal from "../common/BaseModal";
import { useCreatePollMutation } from "../../redux/services/api/voteAPI";
import type { CreatePollRequest, CreatePollOptions } from "../../interfaces/queryInterface/pollAPIInterface";
import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { createVoteValidation } from "../../validations/vote.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import RestaurantListSelect, { type RestaurantOption } from "./RestaurantListSelect";
import "./CreatePollModal.scss";

type CreatePollModalProps = {
    onClose: () => void;
    onSuccess: () => void;
};

function CreatePollModal({ onClose, onSuccess }: CreatePollModalProps) {
    const [createPoll] = useCreatePollMutation();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CreatePollRequest>({
        resolver: yupResolver(createVoteValidation) as Resolver<CreatePollRequest, unknown, CreatePollRequest>,
        defaultValues: {
            title: "",
            description: "",
            expiresAt: undefined,
            options: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    // Optional: when modal opens/close reset
    useEffect(() => {
        // reset on open
        return () => {
            // optional: clear form when unmount
            reset();
        };
    }, [reset]);

    const handleCreatePoll = async (data: CreatePollRequest) => {
        try {
            await createPoll(data).unwrap();
            onSuccess();
        } catch (error) {
            console.error("Failed to create poll:", error);
            setError("root", {
                type: "manual",
                message: "Failed to create poll. Please try again.",
            });
        }
    };

    // derive a user-friendly error for options (Yup sets options.message for array-level errors)
    const optionsError =
        errors.options && errors.options.message
            ? String(errors.options.message)
            : undefined;

    // Convert fields to RestaurantOption[] for the generic component
    const restaurantItems: RestaurantOption[] = fields.map(field => ({
        restaurantName: field.restaurantName,
        restaurantId: field.restaurantId
    }));

    const handleAddRestaurant = (restaurant: RestaurantOption) => {
        const option: CreatePollOptions = {
            restaurantName: restaurant.restaurantName,
            restaurantId: restaurant.restaurantId
        };
        append(option);
    };

    const handleRemoveRestaurant = (index: number) => {
        remove(index);
    };

    return (
        <BaseModal title="Create Vote Poll" onClose={onClose}>
            <div className="poll-modal-container">
                <div className="auth-container">
                    <div className="auth-card">
                        <form className="auth-form" onSubmit={handleSubmit(handleCreatePoll)}>
                        {/* Title */}
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                id="poll-title"
                                {...register("title")}
                                placeholder="Write your poll title"
                                className="form-input"
                                autoComplete="off"
                            />
                            {errors.title && (
                                <div className="form-error">
                                    <span className="error-icon">⚠</span>
                                    {errors.title.message}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <input
                                id="poll-description"
                                {...register("description")}
                                placeholder="Write a short description"
                                className="form-input"
                                autoComplete="off"
                            />
                            {errors.description && (
                                <div className="form-error">
                                    <span className="error-icon">⚠</span>
                                    {errors.description.message}
                                </div>
                            )}
                        </div>

                        {/* Expiration Date */}
                        <div className="form-group">
                            <label htmlFor="expiresAt" className="form-label">
                                Expires At
                            </label>
                            <input
                                id="poll-expiresAt"
                                {...register("expiresAt")}
                                type="datetime-local"
                                className="form-input"
                                autoComplete="off"
                            />
                            {errors.expiresAt && (
                                <div className="form-error">
                                    <span className="error-icon">⚠</span>
                                    {errors.expiresAt.message}
                                </div>
                            )}
                        </div>

                        {/* Restaurant selection */}
                        <div className="form-group">
                            <label className="form-label">Restaurants</label>
                            <RestaurantListSelect
                                items={restaurantItems}
                                onAdd={handleAddRestaurant}
                                onRemove={handleRemoveRestaurant}
                                error={optionsError}
                            />
                        </div>

                        {/* Root error (submission) */}
                        {errors.root && (
                            <div className="form-error" style={{ marginBottom: 8 }}>
                                {errors.root.message}
                            </div>
                        )}

                        {/* Submit */}
                        <button type="submit" className="poll-submit-button" disabled={isSubmitting}>
                            Create Poll
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </BaseModal>
    );
}

export default CreatePollModal;
