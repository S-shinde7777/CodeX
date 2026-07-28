import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useAuth } from "../context/AuthContext";
import ActivityBar from "../components/ActivityBar";
import TeachBackPanel from "../components/TeachBackPanel";

function EditorPage() {
  const { token } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(256); // 256px = w-64
  const [outputHeight, setOutputHeight] = useState(160); // 160px = h-40
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingOutput, setIsDraggingOutput] = useState(false);
  const [code, setCode] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [currentSnippetId, setCurrentSnippetId] = useState(null);
  const [title, setTitle] = useState("Untitled");
  const [running, setRunning] = useState(false);
  const [loadingSnippets, setLoadingSnippets] = useState(true);
  const [showTeachBack, setShowTeachBack] = useState(false);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const response = await fetch("http://localhost:5000/api/snippets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setSnippets(data);
    setLoadingSnippets(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingSidebar) {
        const newWidth = e.clientX - 64; // 64 = ActivityBar width
        if (newWidth >= 180 && newWidth <= 500) {
          setSidebarWidth(newWidth);
        }
      }
      if (isDraggingOutput) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight >= 80 && newHeight <= 500) {
          setOutputHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSidebar(false);
      setIsDraggingOutput(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSidebar, isDraggingOutput]);

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    try {
      const response = await fetch("http://localhost:5000/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setOutput(data.stdout || data.stderr || "No output");
    } catch (err) {
      setOutput("Error running code");
    }
    setRunning(false);
  };

  const handleNewFile = () => {
    setCurrentSnippetId(null);
    setTitle("Untitled");
    setCode("// Write your code here\n");
    setOutput("");
  };

  const handleOpenFile = (snippet) => {
    setCurrentSnippetId(snippet._id);
    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);
    setOutput("");
  };

  const handleSaveFile = async () => {
    if (currentSnippetId) {
      const response = await fetch(
        `http://localhost:5000/api/snippets/${currentSnippetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, language, code }),
        },
      );
      const updated = await response.json();
      setSnippets(snippets.map((s) => (s._id === updated._id ? updated : s)));
    } else {
      const response = await fetch("http://localhost:5000/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, language, code }),
      });
      const newSnippet = await response.json();
      setSnippets([newSnippet, ...snippets]);
      setCurrentSnippetId(newSnippet._id);
    }
  };

  const handleDeleteFile = async (id) => {
    const confirmed = window.confirm(
      "Delete this file? This cannot be undone.",
    );
    if (!confirmed) return;

    await fetch(`http://localhost:5000/api/snippets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnippets(snippets.filter((s) => s._id !== id));
    if (currentSnippetId === id) handleNewFile();
  };

  return (
    <>
      <div className="sm:hidden flex items-center justify-center h-screen bg-[#12141A] text-gray-300 p-6 text-center">
        <p>
          CodeX works best on a larger screen. Please switch to a tablet or
          desktop for the full coding experience.
        </p>
      </div>
      <div className="hidden sm:flex h-screen bg-[#12141A] text-gray-200">
        {" "}
        <ActivityBar />
        {/* My Files panel */}
        <div
          style={{ width: `${sidebarWidth}px` }}
          className="bg-[#181a21] border-r border-gray-800 p-4 flex flex-col flex-shrink-0"
        >
          {" "}
          <button
            onClick={handleNewFile}
            className="bg-amber-400 text-black font-semibold py-2 rounded-lg mb-4 hover:bg-amber-300"
          >
            + New File
          </button>
          <p className="text-sm text-gray-500 mb-2">My Files</p>
          <div className="flex-1 overflow-y-auto space-y-2">
            {loadingSnippets && (
              <p className="text-gray-600 text-sm text-center mt-4">
                Loading...
              </p>
            )}
            {!loadingSnippets && snippets.length === 0 && (
              <p className="text-gray-600 text-sm text-center mt-4">
                No files yet — create one!
              </p>
            )}
            {!loadingSnippets &&
              snippets.map((snippet) => (
                <div
                  key={snippet._id}
                  className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${
                    currentSnippetId === snippet._id
                      ? "bg-teal-900"
                      : "bg-[#1f2128]"
                  }`}
                  onClick={() => handleOpenFile(snippet)}
                >
                  <span className="text-sm truncate">{snippet.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(snippet._id);
                    }}
                    className="text-red-400 text-xs ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
        {/* Main editor area */}
        <div
          onMouseDown={() => setIsDraggingSidebar(true)}
          className="w-1 cursor-col-resize bg-gray-800 hover:bg-teal-500 transition-colors flex-shrink-0"
        />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-4 p-3 border-b border-gray-800 bg-[#181a21]">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border border-gray-700 rounded px-3 py-1 text-sm"
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#1f2128] border border-gray-700 rounded px-3 py-1 text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            <button
              onClick={handleSaveFile}
              className="bg-teal-500 text-black px-4 py-1 rounded text-sm font-medium hover:bg-teal-400"
            >
              Save
            </button>
            <button
              onClick={handleRun}
              disabled={running}
              className="bg-amber-400 text-black px-4 py-1 rounded text-sm font-medium hover:bg-amber-300 disabled:opacity-50"
            >
              {running ? "Running..." : "Run"}
            </button>
            <button
              onClick={() => setShowTeachBack(true)}
              className="bg-purple-400 text-black px-4 py-1 rounded text-sm font-medium hover:bg-purple-300"
            >
              Explain This
            </button>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
              options={{ fontSize: 14, minimap: { enabled: false } }}
            />
          </div>

          <div
            style={{ height: `${outputHeight}px` }}
            className="bg-[#0d0e12] border-t border-gray-800 overflow-y-auto flex flex-col flex-shrink-0"
          >
            <div
              onMouseDown={() => setIsDraggingOutput(true)}
              className="h-1 cursor-row-resize bg-gray-800 hover:bg-amber-400 transition-colors flex-shrink-0"
            />
            <div className="p-3 overflow-y-auto flex-1">
              <p className="text-xs text-gray-500 mb-1">Output</p>
              <pre className="text-sm text-teal-300 whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        </div>
        {showTeachBack && (
          <TeachBackPanel
            code={code}
            language={language}
            onClose={() => setShowTeachBack(false)}
          />
        )}
      </div>
    </>
  );
}

export default EditorPage;
