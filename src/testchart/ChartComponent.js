import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = () => {
    const data = [
        { month: 'January', sales: 65 },
        { month: 'February', sales: 59 },
        { month: 'March', sales: 80 },
        { month: 'April', sales: 81 },
        { month: 'May', sales: 56 },
        { month: 'June', sales: 55 },
    ];

    return (
        <div
            style={{
                background: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div>
                <h2>Chart Example</h2>
                <div>
                    <LineChart width={500} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#8884d8"
                            dot={{ r: 8 }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
