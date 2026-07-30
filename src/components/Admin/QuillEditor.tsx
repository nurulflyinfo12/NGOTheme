"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-72 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700" />
  ),
});

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  return (
    <div className="quill-google-wrapper group">
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        placeholder="Write your blog content here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
        }}
      />

      <style jsx global>{`
        /* 1. Main Container Polish */
        .quill-google-wrapper .ql-toolbar.ql-snow {
          @apply border-gray-200 dark:border-gray-700 rounded-t-2xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3;
          border-bottom: none;
        }

        .quill-google-wrapper .ql-container.ql-snow {
          @apply border-gray-200 dark:border-gray-700 rounded-b-2xl bg-white dark:bg-gray-900 transition-all duration-200;
          min-height: 350px;
        }

        /* 2. Focus State (The Google Blue Ring) */
        .quill-google-wrapper:focus-within .ql-toolbar.ql-snow,
        .quill-google-wrapper:focus-within .ql-container.ql-snow {
          @apply border-primary ring-4 ring-primary/5;
        }

        /* 3. Dark Mode Icon Fix - Essential */
        .dark .quill-google-wrapper .ql-snow .ql-stroke {
          stroke: #e5e7eb; /* gray-200 */
        }
        .dark .quill-google-wrapper .ql-snow .ql-fill {
          fill: #e5e7eb;
        }
        .dark .quill-google-wrapper .ql-snow .ql-picker {
          color: #e5e7eb;
        }

        /* 4. Toolbar Button Hover */
        .quill-google-wrapper .ql-snow.ql-toolbar button:hover {
          @apply bg-gray-200 dark:bg-gray-700 rounded-md text-primary;
        }

        .quill-google-wrapper .ql-snow.ql-toolbar button.ql-active {
          @apply bg-primary/10 rounded-md;
        }

        .quill-google-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          @apply stroke-primary;
        }

        /* 5. Editor Typography */
        .quill-google-wrapper .ql-editor {
          @apply p-6 text-base leading-relaxed text-gray-700 dark:text-gray-200;
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }

        .quill-google-wrapper .ql-editor.ql-blank::before {
          @apply text-gray-400 dark:text-gray-500 not-italic left-6;
        }

        /* Customize scrollbar for the editor */
        .quill-google-wrapper .ql-editor::-webkit-scrollbar {
          width: 8px;
        }
        .quill-google-wrapper .ql-editor::-webkit-scrollbar-track {
          @apply bg-transparent;
        }
        .quill-google-wrapper .ql-editor::-webkit-scrollbar-thumb {
          @apply bg-gray-200 dark:bg-gray-700 rounded-full;
        }
        /* Ensure the editable area fills the container height */
        .quill-google-wrapper .ql-container {
          display: flex;
          flex-direction: column;
        }

        .quill-google-wrapper .ql-editor {
          @apply p-6 text-base leading-relaxed text-gray-700 dark:text-gray-200;
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;

          /* Add these three lines */
          flex: 1;
          min-height: inherit;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
