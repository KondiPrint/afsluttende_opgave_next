import React from 'react';

const ItemsPerPage = ({ setItemsPerPage, setCurrentPage, options = [5, 10, 20, 50, 100] }) => {
  return (
    <div>
      {
        // * "options" svarer til fx. [5, 10, 15, 20]
        options.map((o) => (
          <button
            className='btn'
            key={'btn' + o}
            onClick={() => {
              setItemsPerPage(o);
              setCurrentPage(0);
            }}>
            {o} pr. page
          </button>
        ))
      }
    </div>
  );
};
export default ItemsPerPage;
