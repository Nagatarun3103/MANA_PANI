import { useState, useEffect } from 'react';
import api from '../services/api';

interface Schedule {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
}

const UserDashboard = () => {
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await api.get('/schedule/week');
                setSchedule(response.data);
            } catch (error) {
                console.error('Failed to fetch schedule', error);
            }
        };
        fetchSchedule();
    }, []);

    const handleAddSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/schedule/add', { date, startTime, endTime, description });
            setSchedule([...schedule, response.data]);
            setDescription('');
            setDate('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Failed to add schedule', error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">This Week's Schedule</h2>
                    <div className="space-y-4">
                        {schedule.map((item) => (
                            <div key={item.id} className="bg-gray-800 p-4 rounded-lg">
                                <p className="font-bold">{item.description}</p>
                                <p>{item.date} from {item.startTime} to {item.endTime}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Add New Schedule</h2>
                    <form onSubmit={handleAddSchedule} className="bg-gray-800 p-6 rounded-lg">
                        <div className="mb-4">
                            <label className="block mb-2">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-dark py-2 rounded font-bold">Add Schedule</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
