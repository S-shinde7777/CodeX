import { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

const LANGUAGES = [
  { code: 'en-IN', label: 'English' },
  { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
  { code: 'mr-IN', label: 'मराठी (Marathi)' }
];

function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState('en-IN');
  const recognitionRef = useRef(null);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  if (!isSupported) {
    return (
      <p className="text-xs text-gray-600 mb-2">
        Voice input not supported in this browser. Try Chrome.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-3">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-[#1f2128] border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-gray-300"
        disabled={listening}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>

      <button
        type="button"
        onClick={listening ? stopListening : startListening}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
          listening
            ? 'bg-red-500/20 text-red-400 border border-red-500 animate-pulse'
            : 'bg-teal-500/20 text-teal-400 border border-teal-700 hover:bg-teal-500/30'
        }`}
      >
        {listening ? <MicOff size={14} /> : <Mic size={14} />}
        {listening ? 'Listening...' : 'Speak'}
      </button>
    </div>
  );
}

export default VoiceInput;