interface WhoisFormProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const WhoisForm: React.FC<WhoisFormProps> = ({ inputValue, setInputValue, handleSubmit }) => (
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
);

export default WhoisForm;