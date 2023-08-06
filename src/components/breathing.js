import React, { useRef } from 'react';
import anime from 'animejs';

const BreathingTimer = (props, ref) => {
  const circleRef = useRef(null);
  const expandAnime = useRef(null);
  const shrinkAnime = useRef(null);
  const innerAnimeRef = useRef(null);

  const startContinuousExpansion = () => {
    if(shrinkAnime.current)
      shrinkAnime.current.pause();
    expandAnime.current = anime({
      targets: circleRef.current,
      r: 80,
      duration: 500,
      easing: 'spring(1, 80, 10, 5)',
      complete: () => {
        circleRef.current.setAttribute('r', 25); // Reset radius immediately
        startContinuousExpansion();
      },
    });
  };

  const startContinuousShrinking = () => {
    if(expandAnime.current)
      expandAnime.current.pause();
    shrinkAnime.current = anime({
      targets: circleRef.current,
      r: 25,
      duration: 500,
      easing: 'spring(1, 80, 10, 5)',
      complete: () => {
        circleRef.current.setAttribute('r', 80); // Reset radius immediately
        startContinuousShrinking();
      },
    });
  };

  const outerCircleRef = useRef(null);
  const innerCircleRef = useRef(null);

  const handleExpandClick = () => {
    startContinuousExpansion(); 
    innerAnimeRef.current = anime({
      targets: innerCircleRef.current,
      r: 80,
      duration: 15000,
      easing: 'easeInOutQuad',
    });
  };

  const handleShrinkClick = () => {
    startContinuousShrinking(); 
    innerAnimeRef.current = anime({
      targets: innerCircleRef.current,
      r: 20,
      duration: 15000,
      easing: 'easeInOutQuad',
    });
  };

  const stopAnimations = () => {
    
    innerCircleRef.current.setAttribute('r', 20);

    if(expandAnime.current)
      expandAnime.current.pause();
    if(shrinkAnime.current)
      shrinkAnime.current.pause();
    if(innerAnimeRef.current)
      innerAnimeRef.current.pause();
    
  }

  React.useImperativeHandle(ref, () => ({
    expand: handleExpandClick,
    shrink: handleShrinkClick,
    stop: stopAnimations
  }));

  return (
    <div className="container">
      <svg width="200" height="200">
      <circle
        ref={outerCircleRef}
        cx="100"
        cy="100"
        r="80"
        fill="#a6d7ff"
      />
      <circle
          ref={circleRef}
          cx="100"
          cy="100"
          r="20"
          fill="#16b0fa"
        />
        <circle
          ref={innerCircleRef}
          cx="100"
          cy="100"
          r="20"
          fill="#50CDFD"
        />
        <text
          x="100"
          y="110"
          textAnchor="middle"
          fill="#386880"
          fontSize="24"
        >
          {props.currentState}
        </text>
      </svg>
      </div>
  );
};

export default React.forwardRef(BreathingTimer);
