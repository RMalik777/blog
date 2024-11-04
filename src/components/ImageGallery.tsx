import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { urlFor } from "@/utils/image";
import type { ImageAsset } from "@sanity/types";
import Autoplay from "embla-carousel-autoplay";

interface Props {
	images: ImageAsset[] | undefined;
}

export function ImageGallery({ images }: Readonly<Props>) {
	return images ? (
		<Carousel
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
			opts={{
				loop: true,
			}}
		>
			<CarouselContent>
				{images.map((img, index) => (
					<CarouselItem key={urlFor(img).toString()}>
						<img
							src={urlFor(img).width(1920).height(1080).url() ?? ""}
							alt=""
							width={1920}
							height={1080}
							decoding="async"
							loading="lazy"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	) : null;
}
