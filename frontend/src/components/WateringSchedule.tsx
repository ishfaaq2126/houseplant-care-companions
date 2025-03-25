import React, { useEffect, useState } from 'react';
import { getWateringSchedule } from '../api/plants';
import { format, parseISO } from 'date-fns';

const WateringSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getWateringSchedule(7);
        setSchedule(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="watering-schedule">
      <h2>Watering Schedule (Next 7 Days)</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Plants to Water</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((day) => (
            <tr key={day.date}>
              <td>{day.day_name}</td>
              <td>{format(parseISO(day.date), 'MMM dd')}</td>
              <td>
                {day.plants.length > 0 ? (
                  <ul>
                    {day.plants.map((plant: any) => (
                      <li key={plant.name}>
                        {plant.name}
                        {plant.days_overdue > 0 && (
                          <span className="overdue"> (Overdue by {plant.days_overdue} days)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="no-plants">No plants due</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WateringSchedule;