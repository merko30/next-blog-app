import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  TextHOne,
  TextHTwo,
  TextHThree,
  TextHFour,
  TextHFive,
  TextHSix,
  ListBullets,
  ListNumbers,
  CodeBlock,
  Code,
  TextBolder,
  TextStrikethrough,
  TextItalic,
  ArrowBendDoubleUpLeft,
  ArrowBendDoubleUpRight,
  Quotes,
  Paragraph,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

const ACTIVE_CLASS = "font-bold";
const ICON_CLASS = "p-2 rounded-md hover:bg-gray-100";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //   TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export default ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!editor) {
    return <div className="h-72 bg-gray-50 animate-pulse" />;
  }

  return (
    <div className="border border-gray-200 rounded-md">
      <div className="flex flex-wrap gap-0.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("bold") ? ACTIVE_CLASS : ""
          )}
        >
          <TextBolder />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("italic") ? ACTIVE_CLASS : ""
          )}
        >
          <TextItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("strike") ? ACTIVE_CLASS : ""
          )}
        >
          <TextStrikethrough />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("code") ? ACTIVE_CLASS : ""
          )}
        >
          <Code />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("paragraph") ? ACTIVE_CLASS : ""
          )}
        >
          <Paragraph />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={twMerge(
            ICON_CLASS,
            editor.isActive("heading", { level: 1 }) ? ACTIVE_CLASS : ""
          )}
        >
          <TextHOne />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={twMerge(
            ICON_CLASS,
            editor.isActive("heading", { level: 2 }) ? ACTIVE_CLASS : ""
          )}
        >
          <TextHTwo />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={twMerge(
            ICON_CLASS,
            editor.isActive("heading", { level: 3 }) ? ACTIVE_CLASS : ""
          )}
        >
          <TextHThree />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={twMerge(
            ICON_CLASS,
            editor.isActive("heading", { level: 4 }) ? ACTIVE_CLASS : ""
          )}
        >
          <TextHFour />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={twMerge(
            ICON_CLASS,
            editor.isActive("heading", { level: 5 }) ? ACTIVE_CLASS : ""
          )}
        >
          <TextHFive />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={twMerge(
            ICON_CLASS,
            editor.isActive("heading", { level: 6 }) ? ACTIVE_CLASS : ""
          )}
        >
          <TextHSix />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("bulletList") ? ACTIVE_CLASS : ""
          )}
        >
          <ListBullets />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("orderedList") ? ACTIVE_CLASS : ""
          )}
        >
          <ListNumbers />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("codeBlock") ? ACTIVE_CLASS : ""
          )}
        >
          <CodeBlock />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={twMerge(
            ICON_CLASS,
            editor.isActive("blockquote") ? ACTIVE_CLASS : ""
          )}
        >
          <Quotes />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <ArrowBendDoubleUpLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <ArrowBendDoubleUpRight />
        </button>
      </div>

      <EditorContent
        content={value}
        editor={editor}
        className={twMerge("h-64", className)}
      />
    </div>
  );
};
