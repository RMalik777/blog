// One-time migration required by @sanity/document-internationalization v6:
// moves the language identifier on translation.metadata entries from `_key` to `language`.
// https://github.com/sanity-io/plugins/tree/main/plugins/sanity-plugin-internationalized-array#migrate-from-v4-to-v5
import { migrateToLanguageField } from "sanity-plugin-internationalized-array/migrations";

export default migrateToLanguageField(["translation.metadata"]);
