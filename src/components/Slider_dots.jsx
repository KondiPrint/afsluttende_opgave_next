import classNames from 'classnames';

export default function Dots({ itemsLength, selectedIndex }) {
  const prikker = new Array(itemsLength).fill(0);
  return (
    <div className='flex gap-1 my-2 justify-center -translate-y-5'>
      {prikker.map((p, index) => {
        const selected = index === selectedIndex;
        return (
          <div
            className={classNames({
              'h-4 w-4 rounded-full transition-all duration-300 bg-white': true,
              'opacity-50': !selected,
            })}
            key={index}></div>
        );
      })}
    </div>
  );
}
