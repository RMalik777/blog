export const languages = {
	en: "English",
	id: "Bahasa Indonesia",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

export const ui = {
	en: {
		"site.title": "Rafli Malik",
		"site.description": "Photos and notes from places I've been.",
		"nav.home": "Home",
		"nav.language": "Language",
		"theme.toggle": "Change color theme",
		"theme.light": "Light theme",
		"theme.dark": "Dark theme",
		"theme.system": "System theme",
		"posts.empty": "No posts yet.",
		"posts.emptyLink": "",
		"post.back": "All posts",
		"post.gallery": "Gallery",
		"post.translation": "Baca dalam Bahasa Indonesia",
		"notFound.title": "Page not found",
		"notFound.body": "The page you're looking for doesn't exist or has moved.",
		"notFound.home": "Go to home page",
		"footer.license.content": "Words and photos licensed under",
		"footer.license.code": "Source code under",
	},
	id: {
		"site.title": "Rafli Malik",
		"site.description": "Foto dan catatan dari tempat yang pernah saya kunjungi.",
		"nav.home": "Beranda",
		"nav.language": "Bahasa",
		"theme.toggle": "Ganti tema warna",
		"theme.light": "Tema terang",
		"theme.dark": "Tema gelap",
		"theme.system": "Tema sistem",
		"posts.empty": "Belum ada tulisan dalam Bahasa Indonesia.",
		"posts.emptyLink": "Baca tulisan dalam bahasa Inggris",
		"post.back": "Semua tulisan",
		"post.gallery": "Galeri",
		"post.translation": "Read in English",
		"notFound.title": "Halaman tidak ditemukan",
		"notFound.body": "Halaman yang kamu cari tidak ada atau sudah dipindahkan.",
		"notFound.home": "Kembali ke beranda",
		"footer.license.content": "Tulisan dan foto berlisensi",
		"footer.license.code": "Kode sumber berlisensi",
	},
} as const;

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)["en"]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function formatDate(date: string, lang: Lang) {
	return new Date(date).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
