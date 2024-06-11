"use client";

import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  Plugin,
  RenderViewer,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { MinimalButton } from "@react-pdf-viewer/core";
import {
  pageNavigationPlugin,
  RenderGoToPageProps,
} from "@react-pdf-viewer/page-navigation";
import { useLectures } from "./useLectures";

const disableScrollPlugin = (): Plugin => {
  const renderViewer = (props: RenderViewer) => {
    const { slot } = props;
    if (slot.subSlot && slot.subSlot.attrs && slot.subSlot.attrs.style) {
      slot.subSlot.attrs.style = Object.assign({}, slot.subSlot.attrs.style, {
        overflow: "hidden",
      });
    }
    return slot;
  };

  return {
    renderViewer,
  };
};

export default function LecturePage() {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { GoToPreviousPage, GoToNextPage } = pageNavigationPluginInstance;
  const disableScrollPluginInstance = disableScrollPlugin();

  const { lecture } = useLectures();

  console.log("lecture is: ", lecture);

  return (
    <main className="w-full h-full flex space-x-1 text-center items-center justify-center animate-fadeIn animation-delay-2">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="h-full relative w-full">
          <div className="absolute left-0 top-1/2 translate-x-6 translate-y--1/2 z-[1]">
            <GoToPreviousPage>
              {(props: RenderGoToPageProps) => (
                <MinimalButton onClick={props.onClick}>
                  <FaArrowCircleLeft />
                </MinimalButton>
              )}
            </GoToPreviousPage>
          </div>
          <div className="absolute right-3 top-1/2 translate-x--6 traslate-y--1/2 z-[1]">
            <GoToNextPage>
              {(props: RenderGoToPageProps) => (
                <MinimalButton onClick={props.onClick}>
                  <FaArrowCircleRight />
                </MinimalButton>
              )}
            </GoToNextPage>
          </div>

          {lecture && (
            <Viewer
              fileUrl={lecture}
              defaultScale={SpecialZoomLevel.PageFit}
              plugins={[
                pageNavigationPluginInstance,
                disableScrollPluginInstance,
              ]}
            />
          )}
        </div>
      </Worker>
    </main>
  );
}
