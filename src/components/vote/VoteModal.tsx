import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { hideVoteModal } from '../../redux/reducers/modalVisibleSlice';
import { CURRENT_USER, DUMMY_POLLS } from '../../constants/voteData';
import PollDetail from './PollDetail';
import './VoteModal.scss';
import { PollList } from './PollList';
import BaseModal from '../common/BaseModal';
import { useCreatePollMutation, useGetPollsQuery } from '../../redux/services/api/voteAPI';
import type { PollResponse } from '../../interfaces/queryInterface/pollAPIInterface';

function VoteModal() {
    const show = useAppSelector((state) => state.showVoteModalState.visible);
    const dispatch = useAppDispatch();
    const [selectedPoll, setSelectedPoll] = useState<PollResponse | null>(null);
    const [polls, setPolls] = useState([] as PollResponse[]);

    const { data: votesData } = useGetPollsQuery()
    const [createPoll] = useCreatePollMutation()

    useEffect(() => {
        // Example of creating a new poll on component mount
        const newPoll = {
            title: "Lunch Options",
            description: "Vote for your preferred lunch spot",
            createdBy: CURRENT_USER.userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
            userIds: ["user1", "user2", "user3"],
            options: [
                { restaurantName: "Pizza Place" },
                { restaurantName: "Sushi Spot" },
                { restaurantName: "Burger Joint" }
            ]
        };

        createPoll(newPoll).unwrap()
            .then(() => console.log('Poll created successfully'))
            .catch((error) => console.error('Error creating poll:', error));
    }, []);

    useEffect(() => {
        if (votesData) {
            setPolls(votesData);
        } else {
            setPolls(DUMMY_POLLS);
        }
    }, [votesData]);

    const onClose = () => {
        dispatch(hideVoteModal());
        setSelectedPoll(null);
    };

    const handlePollClick = (poll: PollResponse) => {
        setSelectedPoll(poll);
    };

    const handleVote = (pollId: number, restaurantId: number) => {
        setPolls(prevPolls =>
            prevPolls.map(poll => {
                if (poll.id !== pollId) return poll;

                return {
                    ...poll,
                    options: poll.options.map(option => {
                        // Remove user's previous vote from all options
                        const filteredVotes = option.votes.filter(vote => vote.userId !== CURRENT_USER.userId);

                        // Add vote to the selected restaurant
                        if (option.restaurantId === restaurantId) {
                            return {
                                ...option,
                                votes: [...filteredVotes, {
                                    userId: CURRENT_USER.userId,
                                    userName: CURRENT_USER.userName,
                                    restaurantId
                                }]
                            };
                        }

                        return {
                            ...option,
                            votes: filteredVotes
                        };
                    })
                };
            })
        );

        // Update selected poll if it's currently viewed
        if (selectedPoll && selectedPoll.id === pollId) {
            const updatedPoll = polls.find(p => p.id === pollId);
            if (updatedPoll) {
                setSelectedPoll(updatedPoll);
            }
        }
    };

    if (!show) return null;

    return (
        <BaseModal
            title={selectedPoll ? selectedPoll.title : "Vote for Your Favorite Restaurant"}
            onClose={onClose}
        >{selectedPoll ?
            <PollDetail
                poll={selectedPoll}
                onVote={handleVote}
                currentUser={CURRENT_USER}
            /> : <PollList
                polls={polls}
                handlePollClick={handlePollClick}
            />}
        </BaseModal>
    );
}

export default VoteModal;