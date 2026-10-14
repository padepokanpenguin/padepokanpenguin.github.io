import { blogPosts } from '#lib/data/blogs';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return blogPosts.map((p) => ({ slug: p.slug }));
};

export const load: PageLoad = ({ params }) => {
	const post = blogPosts.find((p) => p.slug === params.slug);
	if (!post) {
		throw error(404, 'Artikel tidak ditemukan');
	}
	return { post };
};
