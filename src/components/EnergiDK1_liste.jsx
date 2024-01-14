'use client';

export default function DK1_liste({ data, currentSide, antalPerSide }) {
  const sliceData = (dataToSlice) => {
    return dataToSlice.slice(currentSide * antalPerSide, currentSide * antalPerSide + antalPerSide);
  };

  return (
    <>
      <div className='overflow-x-auto mx-auto'>
        <table className='table table-zebra text-center mx-auto'>
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>Pris-område</th>
              <th>Spot pris DKK</th>
              <th>Spot pris EUR</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.records &&
              sliceData(data.records).map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    {new Date(d.HourDK).toLocaleString(['da'], {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </td>
                  <td>{d.PriceArea}</td>
                  <td>DKK {Math.round(d.SpotPriceDKK)},-</td>
                  <td>€{Math.round(d.SpotPriceEUR)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
