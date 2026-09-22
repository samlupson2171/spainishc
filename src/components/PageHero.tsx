import Image from 'next/image';
import Link from 'next/link';
import EditableText from '@/components/content/EditableText';

type PageHeroProps = {
  title: string;
  label: string;
  image: string;
  imagePosition?: string;
  contentKey: string;
};

export default function PageHero({ title, label, image, imagePosition = 'center', contentKey }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Image src={image} alt="" fill priority className="page-hero__image" style={{ objectPosition: imagePosition }} sizes="100vw" />
      <div className="r-container page-hero__content">
        <p className="eyebrow !text-[#ddb383]">Bespoke property lawyers</p>
        <EditableText as="h1" className="mt-4" contentKey={contentKey} defaultValue={title} />
        <nav className="page-hero__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>{label}</span>
        </nav>
      </div>
    </section>
  );
}
