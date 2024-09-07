import { Messages } from "@/components/tisseo/line-details/messages";
import { fetchLines } from "@/lib/tisseo/fetch-lines";
import { fetchMessages } from "@/lib/tisseo/fetch-messages";
import LinesTable from "../components/tisseo/lines-table";

export default async function Home() {
  const lines = await fetchLines();
  const messages = await fetchMessages(true);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Accueil</h1>
      {messages.length > 0 && <Messages messages={messages.map((message) => message.message)} />}
      <LinesTable lines={lines} />
    </div>
  );
}
