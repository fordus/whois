import "./index.css";
import DotPattern from "./components/magicui/dot-pattern";
import Card from "./components/card";
import { Toaster } from "sonner";
import useWhois from "./hooks/useWhois";
import WhoisForm from "./components/whois-form";
import WhoisResults from "./components/whois-results";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const App: React.FC = () => {
  const { results, loading, error, inputValue, setInputValue, handleSubmit } = useWhois();

  return (
    <>
      <Toaster expand={true} richColors className="" />
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-4 md:p-8">
        <DotPattern width={20} height={20} cx={1} cy={1} cr={1} />
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center gap-3">
          <Card>
            <div className="flex justify-end">
              <a
                href="https://github.com/fordus/whois"
                target="_blank"
                rel="noreferrer"
              >
                <div className="bg-black text-white text-center p-1 rounded-md font-semibold w-[100px] mx-auto text-sm flex items-center justify-center gap-2">
                  <GitHubLogoIcon className="w-4 h-4 inline-block" />
                  <span>Fordus</span>
                </div>
              </a>
            </div>

            <div className="grid gap-3 text-center ">
              <h1 className="font-cal text-4xl text-foregrounds font-bold">
                Whois Lookup
              </h1>
              <p className="text-muted-foreground">
                Enter a domain to get the Whois information
              </p>
            </div>

            <WhoisForm inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} />
          </Card>

          {loading && <Card><div className="text-center font-medium">Loading...</div></Card>}
          {error && <Card><div className="text-center text-red-600 font-medium">{error}</div></Card>}
          {results && <WhoisResults results={results} />}
        </div>
      </main>
    </>
  );
};

export default App;