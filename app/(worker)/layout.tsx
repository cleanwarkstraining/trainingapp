import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Providers } from "@/components/worker/Providers";

export default async function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <div className="min-h-dvh max-w-lg mx-auto relative">{children}</div>
      </Providers>
    </NextIntlClientProvider>
  );
}
