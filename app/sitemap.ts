import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://desitrails.vipgaming.in';

  // 1. डेटाबेस से सभी टूर्स के स्लग और अपडेटेड डेट फेच करें
  const { data: tours } = await supabase.from('tours').select('slug, updated_at');

  const tourUrls = tours?.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(tour.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  // 2. स्टैटिक पेज और डायनेमिक टूर पेज को मिलाकर रिटर्न करें
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/freelancing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/affiliate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...tourUrls, // यहाँ डेटाबेस वाले सारे टूर्स ऑटोमैटिकली जुड़ जाएंगे
  ];
}