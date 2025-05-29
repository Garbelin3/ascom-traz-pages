
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimationConfig {
  duration: number;
  delay: number;
  ease: string | number[];
  reducedMotion: boolean;
}

export const useModernAnimations = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getAnimationConfig = (
    duration = 0.6,
    delay = 0,
    ease: string | number[] = [0.25, 0.46, 0.45, 0.94]
  ): AnimationConfig => ({
    duration: shouldReduceMotion ? 0 : duration,
    delay: shouldReduceMotion ? 0 : delay,
    ease: shouldReduceMotion ? 'linear' : ease,
    reducedMotion: !!shouldReduceMotion
  });

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: getAnimationConfig(0.6, delay)
  });

  const fadeInLeft = (delay = 0) => ({
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    animate: { opacity: 1, x: 0 },
    transition: getAnimationConfig(0.6, delay)
  });

  const fadeInRight = (delay = 0) => ({
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    animate: { opacity: 1, x: 0 },
    transition: getAnimationConfig(0.6, delay)
  });

  const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: getAnimationConfig(0.6, delay, [0.34, 1.56, 0.64, 1])
  });

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const staggerItem = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: getAnimationConfig(0.5, 0)
  };

  const hoverScale = {
    whileHover: shouldReduceMotion ? {} : { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    whileTap: shouldReduceMotion ? {} : { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const floatingAnimation = {
    animate: shouldReduceMotion ? {} : {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: shouldReduceMotion ? {} : {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return {
    isVisible,
    shouldReduceMotion,
    getAnimationConfig,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerContainer,
    staggerItem,
    hoverScale,
    floatingAnimation,
    pulseAnimation
  };
};

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  threshold = 0.1,
  rootMargin = '0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin, hasIntersected]);

  return { isIntersecting, hasIntersected };
};

export const useGestures = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    return { isLeftSwipe, isRightSwipe, distance };
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    touchStart,
    touchEnd
  };
};
