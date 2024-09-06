import { useState } from "react";
import { toast } from "sonner";
import getWhois from "../services/getWhois";

interface WhoisData {
  domain?: string;
  expires_at?: string;
}

const useWhois = () => {
  const [results, setResults] = useState<WhoisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const isValidDomain = (domain: string): boolean => {
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,}|xn--[a-z0-9]{1,59})$/i;
    return domainRegex.test(domain);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (inputValue.trim() === "") {
      setLoading(false);
      toast.error("Please enter a domain name.");
      return;
    }

    if (!isValidDomain(inputValue)) {
      setLoading(false);
      toast.error("Invalid domain format. Please enter a valid domain.");
      return;
    }

    try {
      const data = await getWhois(inputValue);

      if (data) {
        setResults({
          ...data,
        });
        toast.success("Data fetched successfully!");
      } else {
        setError("No data available for the given domain.");
        toast.error("No data available for the given domain.");
      }
    } catch (error) {
      setError("Failed to get info. Try again.");
      toast.error("Failed to fetch data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, inputValue, setInputValue, handleSubmit };
};

export default useWhois;
