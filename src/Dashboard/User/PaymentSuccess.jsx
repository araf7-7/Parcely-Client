
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="payment-success">
            <Confetti />
            <div className='text-4xl text-center'>
                <h1>Payment Successful!</h1>
                <p>Thank you for your payment.</p>
                <Link to='/dashboard/myParcel'>
                    <button className='btn bg-blue-300 mt-10'>Back To Parcel Page</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;