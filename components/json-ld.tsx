import { env } from '@/lib/env';
import { social } from '@/lib/social';
import type { Person, WithContext } from 'schema-dts';

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const baseUrl = `${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

const person: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felix Arjuna',
  description: 'Cloud DevOps Engineer',
  gender: 'male',
  nationality: 'Indonesian',
  url: baseUrl,
  image: new URL('/profile.png', baseUrl).toString(),
  sameAs: Object.values(social).map(({ href }) => href),
  alumniOf: 'Aachen University of Applied Sciences',
};

export const JsonLd = () => (
  <script type="application/ld+json">{JSON.stringify(person)}</script>
);
