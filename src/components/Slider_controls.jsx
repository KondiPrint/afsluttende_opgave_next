import classNames from 'classnames';

export default function SliderControls(navigation) {
  return (
    <div className='flex justify-center gap-2 '>
      <button
        onClick={() => {
          if (navigation.canScrollPrev) {
            navigation.onPrev();
          }
        }}
        className={classNames({
          'px-4 py-2 text-white rounded-md': true,
          'bg-indigo-200': !navigation.canScrollPrev,
          'bg-indigo-400': navigation.canScrollPrev,
        })}>
        Forrige
      </button>
      <button
        onClick={() => {
          if (navigation.canScrollNext) {
            navigation.onNext();
          }
        }}
        className={classNames({
          'px-4 py-2 text-white rounded-md': true,
          'bg-indigo-200': !navigation.canScrollNext,
          'bg-indigo-400': navigation.canScrollNext,
        })}>
        Næste
      </button>
    </div>
  );
}
