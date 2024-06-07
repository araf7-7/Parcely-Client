import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { IoStatsChartOutline } from 'react-icons/io5';

const Statistic = () => {
    // const [bookingData, setBookingData] = useState([]);
    const axiosSecure = useAxiosSecure()
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [],
            },
        },
    });

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel`);
            return res.data;
        },
    });

    useEffect(() => {
        // Process the booking data for the chart
        const processData = () => {
            const bookingsByDate = {};
            parcels.forEach(booking => {
                const date = booking.bookingDate;
                bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
            });

            const dates = Object.keys(bookingsByDate);
            const counts = Object.values(bookingsByDate);

            setChartData({
                series: [{ name: 'Bookings', data: counts }],
                options: {
                    ...chartData.options,
                    xaxis: { categories: dates },
                },
            });
        };

        if (Array.isArray(parcels)) {
            processData();
        }
    }, [chartData.options, parcels]);

    return (
        <div className='m-2'>
            <h1 className='text-4xl ml-4 my-10 flex gap-2'> <IoStatsChartOutline />Admin Dashboard</h1>
            <ApexCharts
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default Statistic;
