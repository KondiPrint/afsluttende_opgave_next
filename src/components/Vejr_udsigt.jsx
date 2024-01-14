import React from 'react';

export default function Vejr_udsigt({ dataForecast, dataCoord }) {
  // Den her funktion beregner dagens dato for hvert objekt i dataForecasten
  const beregnDagsDato = (dagIndex) => {
    const dagsDato = new Date();
    dagsDato.setDate(dagsDato.getDate() + dagIndex);
    return dagsDato.toISOString().split('T')[0];
  };

  return (
    <>
      {dataCoord && <h3 className='text-center mt-20 text-3xl'>Udsigten for de næste 5 dage i {dataCoord.name}</h3>}
      {dataForecast &&
        // Her sørger jeg for at den HØJST laver 5 accordians (da det kun er 5 dage frem, at den samler dataForecast)
        Array.from({ length: 5 }).map((_, index) => {
          // Her beregner den datoen for den nuværende dag
          const dayDate = beregnDagsDato(index);

          // Her filtrer den dataForecasten for den specifikke dag, ved brug af dataForecast.list.dt_text
          const daydataForecast = dataForecast?.list.filter((day) => day.dt_txt.includes(dayDate));

          // Her snupper den tidspunkt for solopgang/solnedgang for den specifikke dag, fra dataForecast.city
          const solInfo = dataForecast?.city || {};
          const dayOpgang = solInfo.sunrise || '';
          const dayNedgang = solInfo.sunset || '';

          return (
            <div className='collapse collapse-arrow bg-base-200 mt-10' key={index}>
              <input type='radio' name='my-accordion-2' defaultChecked={index === 0} />
              <div className='overflow-x-auto collapse-title text-xl font-medium'>
                <table className='table text-center'>
                  <thead>
                    <tr>
                      <th>Dato</th>
                      <th>Solopgang</th>
                      <th>Solnedgang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayOpgang && dayNedgang && (
                      <tr className='bg-base-200'>
                        <th>{dayDate}</th>
                        <td>{new Date(dayOpgang * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{new Date(dayNedgang * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='collapse-content'>
                <div className='overflow-x-auto'>
                  <table className='table table-zebra text-center'>
                    <thead>
                      <tr>
                        <th>Tid</th>
                        <th>Temperatur</th>
                        <th className='text-center'>Beskrivelse</th>
                        <th></th>
                        <th>Luftfugtighed</th>
                        <th>Lufttryk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daydataForecast.map((f, subIndex) => (
                        <tr key={subIndex}>
                          <td>{new Date(f.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                          <td>{Math.round(f.main.temp)}&deg;C</td>
                          <td>{f.weather[0].description}</td>
                          <td>
                            <figure className=' w-fit bg-sky-500 rounded-full'>
                              <img src={`https://openweathermap.org/img/wn/${f.weather[0].icon}` + '.png'} alt='' />
                            </figure>
                          </td>
                          <td>{f.main.humidity}%</td>
                          <td>{f.main.pressure} hPa</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
