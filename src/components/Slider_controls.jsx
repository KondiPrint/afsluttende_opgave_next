import classNames from 'classnames';

export default function SliderControls(navigation) {
  return (
    <div className='flex justify-center gap-2 '>
      <button
        onClick={() => {
          navigation.onPrev();
        }}
        className={classNames({
          'px-4 py-2 text-white rounded-md': true,
          'bg-indigo-400': navigation.canScrollPrev,
        })}>
        Forrige
      </button>
      <button
        onClick={() => {
          navigation.onNext();
        }}
        className={classNames({
          'px-4 py-2 text-white rounded-md': true,
          'bg-indigo-400': navigation.canScrollNext,
        })}>
        Næste
      </button>
    </div>
  );
}
