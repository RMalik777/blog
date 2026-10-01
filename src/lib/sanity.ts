import { sanityClient } from "sanity:client";
import { defineQuery } from "groq";
import type { Lang } from "@/i18n/ui";

export const POSTS_INDEX_QUERY = defineQuery(`
	*[_type == "post" && language == $language && defined(slug.current)]
	| order(coalesce(publishedAt, _createdAt) desc) {
		_id,
		title,
		location,
		excerpt,
		"slug": slug.current,
		"date": coalesce(publishedAt, _createdAt),
		thumbnail {
			alt,
			crop,
			hotspot,
			asset->{ _id, metadata { lqip, dimensions { width, height } } }
		},
		"gallery": gallery[0...4] {
			_key,
			alt,
			crop,
			hotspot,
			asset->{ _id, metadata { lqip, dimensions { width, height } } }
		}
	}
`);

export const POST_SLUGS_QUERY = defineQuery(`
	*[_type == "post" && language == $language && defined(slug.current)].slug.current
`);

export const POST_DETAIL_QUERY = defineQuery(`
	*[_type == "post" && language == $language && slug.current == $slug][0] {
		_id,
		_updatedAt,
		title,
		location,
		excerpt,
		body,
		"slug": slug.current,
		"date": coalesce(publishedAt, _createdAt),
		thumbnail {
			alt,
			crop,
			hotspot,
			asset->{ _id, metadata { lqip, dimensions { width, height } } }
		},
		gallery[] {
			_key,
			alt,
			caption,
			crop,
			hotspot,
			asset->{ _id, metadata { lqip, dimensions { width, height } } }
		},
		"translations": *[_type == "translation.metadata" && references(^._id)][0]
			.translations[language != $language].value->{ language, "slug": slug.current }
	}
`);

export function getPosts(language: Lang) {
	return sanityClient.fetch(POSTS_INDEX_QUERY, { language });
}

export function getPostSlugs(language: Lang) {
	return sanityClient.fetch(POST_SLUGS_QUERY, { language });
}

export function getPost(slug: string, language: Lang) {
	return sanityClient.fetch(POST_DETAIL_QUERY, { slug, language });
}
