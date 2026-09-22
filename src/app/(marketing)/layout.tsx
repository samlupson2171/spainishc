import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentEditorProvider from "@/components/content/ContentEditorProvider";
import { auth } from "@/lib/auth";
import { getSiteContent } from "@/lib/siteContent";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, initialContent] = await Promise.all([
    auth(),
    getSiteContent().catch((error) => {
      console.error("Unable to load editable site content:", error);
      return {};
    }),
  ]);

  return (
    <ContentEditorProvider initialContent={initialContent} canEdit={Boolean(session?.user?.email)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </ContentEditorProvider>
  );
}
