import { ProtectedRoute } from "../../components/ProtectedRoute"
import { useLocation } from 'react-router-dom';
// import PollDetail from "../../components/vote/PollDetail";

function VotePage() {
    const location = useLocation();
    const pollId = location.state?.pollId;
    console.log('pollId:', pollId);
    return (
        <ProtectedRoute>
            {/* show selected poll Restaurant Rankings details */}
            {/* <PollDetail pollId={pollId} /> */}
            <div>Vote Page - under construction</div>
        </ProtectedRoute>
    )
}

export default VotePage