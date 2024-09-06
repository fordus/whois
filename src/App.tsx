import React, { useState } from 'react';
import './index.css';
import DotPattern from './components/magicui/dot-pattern';
import Card from './components/card';
import { Toaster, toast } from 'sonner';
import getWhois from './getWhois';

interface WhoisData {
  domain?: string;
  expires_at?: string;
}

const App: React.FC = () => {
  const [results, setResults] = useState<WhoisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const isValidDomain = (domain: string): boolean => {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,}|xn--[a-z0-9]{1,59})$/i;
    return domainRegex.test(domain);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (inputValue.trim() === '') {
      setLoading(false);
      toast.error('Please enter a domain name.');
      return;
    }

    if (!isValidDomain(inputValue)) {
      setLoading(false);
      toast.error('Invalid domain format. Please enter a valid domain.');
      return;
    }

    try {
      const data = await getWhois(inputValue);

      if (data) {
        setResults({
          ...data,
        });
        toast.success('Data fetched successfully!');
      } else {
        setError('No data available for the given domain.');
        toast.error('No data available for the given domain.');
      }
    } catch (error) {
      setError('Failed to get info. Try again.');
      toast.error('Failed to fetch data. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster expand={true} richColors className='' />
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 p-4 md:p-8">
        <DotPattern width={20} height={20} cx={1} cy={1} cr={1} />
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center gap-3">
          <Card>
            <div className="grid grid-cols-4 gap-3">

            <div className="grid gap-3 text-center mb-3 col-span-3">
              <h1 className="font-cal text-4xl text-foregrounds font-bold">Whois Lookup</h1>
              <p className="text-muted-foreground">Enter a domain to get the Whois information</p>
            </div>
            <a href="https://github.com/fordus/whois" target="_blank" rel="noreferrer" >
              <div className="bg-black text-white text-center p-1 rounded-md font-semibold w-[200px] mx-auto text-sm">
                <span>GitHub.com/fordus</span>
              </div>
            </a>
            </div>


            <form id="form" onSubmit={handleSubmit} className="mb-6">
              <input
                type="text"
                name="input"
                id="input"
                placeholder="Enter domain"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 w-full"
              >
                Submit
              </button>
            </form>
          </Card>

          {loading && <Card><div className="text-center  font-medium">Loading...</div></Card>}
          {error && <Card><div className="text-center text-red-600 font-medium">{error}</div></Card>}
          {results && (
            <Card>
              <div className="p-6">
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">NAME:</span>
                  <span className="ml-2 text-gray-900">{results.domain ?? 'N/A'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">EXPIRE:</span>
                  <span className="ml-2 text-gray-900">{results.expires_at ?? 'N/A'}</span>
                </div>
                <div className="mt-6">
                  <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg border border-gray-300 text-gray-800">
                    {JSON.stringify(results, null, 2)}
                  </pre>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
