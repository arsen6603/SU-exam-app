import { Header } from "@/components/Header";
import { TicketBoard } from "@/components/TicketBoard";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <Header />
      <TicketBoard />
    </main>
  );
}
