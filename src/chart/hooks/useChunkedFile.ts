import { useCallback, useRef, useState } from "react";

type UseFileChunkReaderReturn = {
  readFileChunks: (file: File) => void;
  error: string | null;
};

export function useFileChunkReader(
  onComplete: (s: string) => void // Callback when reading is complete
): UseFileChunkReaderReturn {
  const contents = useRef<string>("");
  const [error, setError] = useState<string | null>(null);

  const readFileChunks = useCallback(
    (file: File) => {
      const chunkSize = 1024 * 1024; // 1 MB
      let offset = 0;

      setError(null);

      function readNextChunk() {
        if (offset >= file.size) {
          onComplete(contents.current);
          return;
        }

        const chunk = file.slice(offset, offset + chunkSize);
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            contents.current += e.target.result as string;
          }
          offset += chunkSize;
          setTimeout(readNextChunk, 0); // Schedule next chunk
        };

        reader.onerror = (err) => {
          setError(`Error reading file: ${err}`);
        };

        reader.readAsText(chunk);
      }

      readNextChunk();
    },
    [onComplete]
  );

  return { readFileChunks, error };
}
