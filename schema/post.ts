import { defineArrayMember, defineField, defineType, type SlugValidationContext } from "sanity";

export default defineType({
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		defineField({
			name: "language",
			type: "string",
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			validation: (rule) => rule.required(),
			options: {
				source: "title",
				maxLength: 96,
				isUnique: isUniqueOtherThanLanguage,
			},
		}),
		defineField({
			name: "publishedAt",
			title: "Published at",
			description: "Shown as the post date. Falls back to the creation date when empty.",
			type: "datetime",
		}),
		defineField({
			name: "location",
			title: "Location",
			type: "string",
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			description: "One or two sentences shown on the home page and in link previews.",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "thumbnail",
			title: "Cover image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					title: "Alternative text",
					description: "Describe the photo for people using screen readers.",
					type: "string",
				}),
			],
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "blockContent",
		}),
		defineField({
			name: "gallery",
			title: "Gallery",
			type: "array",
			of: [
				defineArrayMember({
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: "alt",
							title: "Alternative text",
							type: "string",
						}),
						defineField({
							name: "caption",
							title: "Caption",
							type: "string",
						}),
					],
					preview: {
						select: {
							caption: "caption",
							alt: "alt",
							filename: "asset.originalFilename",
							media: "asset",
						},
						prepare({ caption, alt, filename, media }) {
							return {
								title: caption || alt || filename || "Photo",
								subtitle: caption && alt ? alt : undefined,
								media,
							};
						},
					},
				}),
			],
		}),
	],
	orderings: [
		{
			title: "Published date, newest first",
			name: "publishedAtDesc",
			by: [{ field: "publishedAt", direction: "desc" }],
		},
	],
	preview: {
		select: {
			title: "title",
			location: "location",
			language: "language",
			media: "thumbnail",
		},
		prepare({ title, location, language, media }) {
			const subtitle = [language?.toUpperCase(), location].filter(Boolean).join(", ");
			return { title, subtitle, media };
		},
	},
});

export async function isUniqueOtherThanLanguage(slug: string, context: SlugValidationContext) {
	const { document, getClient } = context;
	if (!document?.language) {
		return true;
	}
	const client = getClient({ apiVersion: "2026-09-30" });
	const id = document._id.replace(/^drafts\./, "");
	const params = {
		draft: `drafts.${id}`,
		published: id,
		language: document.language,
		slug,
	};
	const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;
	const result = await client.fetch(query, params);
	return result;
}
