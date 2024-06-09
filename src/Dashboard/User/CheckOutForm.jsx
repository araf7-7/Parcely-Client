import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const CheckOutForm = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const { user } = useAuth()
    const { data: parcel, isLoading, isSuccess } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/parcel/g/${id}`);
            return res.data;
        }
    });

    // const price = parcel.reduce((total, item) => total + item.price, 0);
    useEffect(() => {
        if (isLoading) {
            return
        }
        if (!isSuccess) {
            return
        }
        if (parcel.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: parcel?.price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, parcel, isLoading, isSuccess])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('Payment Error', error);
            setError(error.message)
        }
        else {
            console.log('Payment Method', paymentMethod);
            setError('')
        }
        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.name || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transition id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                navigate('/dashboard/payment-success')
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mx-10">
            <CardElement className=" rounded-xl text-3xl p-10 bg-blue-300"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: 'black',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className="btn btn-block bg-blue-300 my-3" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-700">{error}</p>
            {transactionId && <p className="text-green-500">Your Transaction Id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;