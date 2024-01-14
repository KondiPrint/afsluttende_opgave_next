import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function SliderControls(navigation) {
  return (
    <div className='flex justify-center gap-5 '>
      <button
        onClick={() => {
          navigation.onPrev();
        }}
        className='btn btn-primary text-white mb-56'>
        <FaChevronLeft />
      </button>
      <button
        onClick={() => {
          navigation.onNext();
        }}
        className='btn btn-primary text-white'>
        <FaChevronRight />
      </button>
    </div>
  );
}
