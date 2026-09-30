import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LangSelector() {
	return (
		<Tabs defaultValue="en" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="en">EN</TabsTrigger>
				<TabsTrigger value="id">ID</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
