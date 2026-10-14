import { blogPosts } from '#lib/data/blogs';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const today = new Date().toISOString().split('T')[0];

	const pages = [
		{ loc: 'https://padepokanpenguin.github.io/', lastmod: today, priority: '1.0', changefreq: 'weekly' },
		...blogPosts.map((post) => ({
			loc: `https://padepokanpenguin.github.io/blog/${post.slug}`,
			lastmod: post.date,
			priority: '0.8',
			changefreq: 'monthly'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
