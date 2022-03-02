import Link from 'next/link';
import Image from 'next/image';

import ComponentsShowMDX from './ComponentsShowMDX';

const CustomLink = props => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink,
  ShowComponent: ComponentsShowMDX
};

export default MDXComponents;
