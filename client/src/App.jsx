import React, { useEffect, useState } from 'react';
import {Calendar, dayjsLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'

function App() {

  const localizer = dayjsLocalizer(dayjs)

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/reservas/')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.body)) {
          const eventos = data.body.map(reserva => {
            const fechaReserva = new Date(reserva.fechaReserva);
            const [horaInicioHours, horaInicioMinutes] = reserva.horaInicio.split(':').map(Number);
            const [horaFinHours, horaFinMinutes] = reserva.horaFin.split(':').map(Number);
  
            const start = new Date(fechaReserva);
            start.setHours(horaInicioHours, horaInicioMinutes);
  
            const end = new Date(fechaReserva);
            end.setHours(horaFinHours, horaFinMinutes);
  
            return {
              start,
              end,
              title: reserva.id.toString(),
            };
          });
          setEvents(eventos);
        } else {
          console.error('Data body is not an array:', data.body);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  return (
    <div >
      <Calendar  
      style={
        {
          height: 1000,
          width: 1000
        }
      } 
      localizer={localizer}
      events = {events}
      />
    </div>
  )

}





export default App
