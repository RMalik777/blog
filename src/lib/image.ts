import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
	return builder.image(source).auto("format").quality(80);
}

export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2400];

export function srcsetFor(source: SanityImageSource, widths = IMAGE_WIDTHS, aspectRatio?: number) {
	return widths
		.map((width) => {
			const image = urlFor(source).width(width);
			return `${(aspectRatio ? image.height(Math.round(width / aspectRatio)) : image).url()} ${width}w`;
		})
		.join(", ");
}
