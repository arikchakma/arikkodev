import { BackArrowIcon } from "./icons/BackArrowIcon";
import { sound } from "../lib/sound";

type BackButtonProps = {
  href: string;
  label: string;
};

export function BackButton(props: BackButtonProps) {
  const { href, label } = props;

  return (
    <a
      href={href}
      onClick={() => sound.nav()}
      className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-black"
    >
      <BackArrowIcon />
      {label}
    </a>
  );
}
