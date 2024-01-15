import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import Dots from './Slider_dots';
import SliderControls from './Slider_controls';
import React from 'react';

/* Den her slider er blevet snuppet fra https://reacthustle.com/blog/nextjs-carousel-tailwindcss-embla-carousel, med få ændringer til controls og dots */

export default function Slider({ children, ...options }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const length = React.Children.count(children);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();

  useEffect(() => {
    function selectHandler() {
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on('select', selectHandler);
    return () => {
      emblaApi?.off('select', selectHandler);
    };
  }, [emblaApi]);

  return (
    <>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex '>{children}</div>
      </div>

      <Dots itemsLength={length} selectedIndex={selectedIndex} />
      <SliderControls canScrollNext={canScrollNext} canScrollPrev={canScrollPrev} onNext={() => emblaApi?.scrollNext()} onPrev={() => emblaApi?.scrollPrev()} />
    </>
  );
}
