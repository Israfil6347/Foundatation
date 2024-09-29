const velocity = {
  High: { velocity: 300 },
  Medium: { velocity: 100 },
  Low: { velocity: 50 },
};

const tween = {
  High: {
    duration: 0.3,
    type: 'tween',
    stiffness: 100,
  },
  Medium: {
    duration: 0.3,
    type: 'tween',
    stiffness: 100,
  },
  Low: {
    duration: 0.3,
    type: 'tween',
    stiffness: 100,
  },
};

const stiffness = {
  High: { stiffness: 300 },
  Medium: { stiffness: 100 },
  Low: { stiffness: 50 },
};

const staggerChildren = {
  Slow: {
    staggerChildren: 0.8,
  },
  Medium: {
    staggerChildren: 0.3,
  },
  Fast: {
    staggerChildren: 0.1,
  },
};

const spring = {
  High: {
    duration: 0.1,
    type: 'spring',
    stiffness: 300,
  },
  Medium: {
    duration: 0.1,
    type: 'spring',
    stiffness: 130,
  },
  Low: {
    duration: 0.1,
    type: 'spring',
    stiffness: 70,
  },
};

const repeat = {
  LargeDelay: {
    repeat: Infinity,
    repeatDelay: 5,
  },
  MediumDelay: {
    repeat: Infinity,
    repeatDelay: 3,
  },
  SmallDelay: {
    repeat: Infinity,
    repeatDelay: 1,
  },
};

export const mass = {
  High: { mass: 300 },
  Medium: { mass: 100 },
  Low: { mass: 50 },
};

const ease = {
  Linear: { ease: 'linear' },
  EaseIn: { ease: 'easeIn' },
  EaseOut: { ease: 'easeOut' },
  EaseInOut: { ease: 'easeInOut' },
  CircIn: { ease: 'circIn' },
  CircOut: { ease: 'circOut' },
  CircInOut: { ease: 'circInOut' },
  BackIn: { ease: 'backIn' },
  BackOut: { ease: 'backOut' },
  BackInOut: { ease: 'backInOut' },
};

const duration = {
  High: { duration: 10 },
  Medium: { duration: 5 },
  Low: { duration: 1 },
};

const delay = {
  High: { delay: 3 },
  Medium: { delay: 0.5 },
  Low: { delay: 0.1 },
};

const damping = {
  High: { damping: 300 },
  Medium: { damping: 100 },
  Low: { damping: 50 },
};

const bounce = {
  High: { bounce: 300 },
  Medium: { bounce: 100 },
  Low: { bounce: 50 },
};

export class MyTransition {
  static Bounce = bounce;
  static Damping = damping;
  static Delay = delay;
  static Duration = duration;
  static Ease = ease;
  static Mass = mass;
  static Repeat = repeat;
  static Spring = spring;
  static StaggerChildren = staggerChildren;
  static Stiffness = stiffness;
  static Tween = tween;
  static Velocity = velocity;
}
