import Location from './Location';

export default function MarqueeLocation() {
  return (
    <div className="gradient-clip relative hidden w-full items-center overflow-hidden -sm:flex">
      <div className="relative flex animate-ticker-loop items-center gap-1.5 duration-[20s] hover:[animation-play-state:paused]">
        <div className="flex items-center">
          <Location />
          <span className="px-1.5">·</span>
          <Location />
          <span className="px-1.5">·</span>
          <Location />
          <span className="px-1.5">·</span>
        </div>
        <div className="absolute right-0 translate-x-full">
          <div className="flex items-center">
            <Location />
            <span className="px-1.5">·</span>

            <Location />
            <span className="px-1.5">·</span>

            <Location />
          </div>
        </div>
      </div>
    </div>
  );
}
