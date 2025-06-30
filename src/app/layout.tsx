import EmotionRegistry from "@/lib/emotion-registry";
import { GlobalStyles } from "@/styles/GlobalStyles";

export const metadata = {
  title: "LiveNote",
  description: "Your thoughts, saved instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <GlobalStyles />
          {children}
        </EmotionRegistry>
      </body>
    </html>
  );
}
