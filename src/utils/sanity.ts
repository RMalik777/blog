import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(language: string): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current) && language == $language] | order(_createdAt desc)`,
    { language }
  );
}

export async function getPost(slug: string, language: string): Promise<Post> {
  return await sanityClient.fetch(groq`*[_type == "post" && slug.current == $slug && language == $language][0]`, {
    slug,
    language,
  });
}

export interface Post {
  _type: "post";
  _createdAt: string;
  language: Readonly<string>;
  title: string;
  location?: string;
  slug: Slug;
  excerpt?: string;
  thumbnail?: ImageAsset;
  body: PortableTextBlock[];
  gallery?: ImageAsset[];
}
