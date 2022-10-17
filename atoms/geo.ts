import { atom } from 'jotai';

export const countryAtom = atom('BD');
export const cityAtom = atom('Dhaka');

const geo = atom(
  get => {
    return { country: get(countryAtom), city: get(cityAtom) };
  },
  (get, set, geo: { country: string; city: string }) => {
    set(countryAtom, String(geo.country));
    set(cityAtom, String(geo.city));
  }
);

export default geo;
