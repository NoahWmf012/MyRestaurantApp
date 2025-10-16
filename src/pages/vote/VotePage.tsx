import { ProtectedRoute } from "../../components/ProtectedRoute"
import { useLocation } from 'react-router-dom';

function VotePage() {
    const location = useLocation();
    const pollId = location.state?.pollId;
    console.log('pollId:', pollId);
    return (
        <ProtectedRoute>
            <div>VotePage</div>
        </ProtectedRoute>
    )
}

export default VotePage