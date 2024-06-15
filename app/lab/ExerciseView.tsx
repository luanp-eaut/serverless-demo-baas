"use client";

import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export const ExerciseView = ({ url }: { url?: string }) => {
  return (
    <main className="w-full h-full flex space-x-1 text-center items-center justify-center animate-fadeIn animation-delay-2">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        {url && (
          <Viewer fileUrl={url} defaultScale={SpecialZoomLevel.PageWidth} />
        )}
      </Worker>
    </main>
  );
};
