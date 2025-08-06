declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': {
      src?: string;
      background?: string;
      speed?: string;
      direction?: string;
      loop?: boolean;
      autoplay?: boolean;
      className?: string;
      style?: React.CSSProperties;
    };
  }
}
