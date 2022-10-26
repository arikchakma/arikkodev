import Clock from './Clock';
import { useQuery } from '@tanstack/react-query';

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export default function Location() {
  const { data } = useQuery(['locations'], () => {
    return fetch('/api/geo').then(res => res.json());
  });

  return (
    <div className="flex items-center gap-1.5 text-[#5d676a]">
      <Clock />
      <span aria-hidden className="select-none">
        ·
      </span>
      <div className="cursor-pointer whitespace-nowrap text-xs grayscale transition-[filter_colors] duration-150 ease-in-out hover:text-[#313233] hover:grayscale-0">
        {getFlagEmoji('BD')} Dhaka, Bangladesh
      </div>

      {data ? (
        <>
          <span aria-hidden className="select-none">
            ·
          </span>
          <div>
            <p className="group flex cursor-pointer items-center gap-1 whitespace-nowrap text-xs">
              Visiting from
              <span className="grayscale transition-[filter_colors] duration-150 ease-in-out group-hover:text-[#313233] group-hover:grayscale-0">
                {getFlagEmoji(data.country)}
                {data.city ? ` ${data.city}, ` : null}
                {regionNames.of(data.country)}
              </span>
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
