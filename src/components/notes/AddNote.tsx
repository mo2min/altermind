import React, { useCallback } from "react";

export default function AddNote({ onAddNote }: any) {
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { title } = e.target;
      const newPage = "" + title.value;
      e.target.reset();
      const data = await fetch(
        `https://api.github.com/repos/fireb1003/noterepo-repo/contents/${newPage}.md`,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`, // YA Stupid
            Accept: "application/vnd.github.v3.raw",
          },
          method: "PUT",
          body: JSON.stringify({
            message: "Create file",
            content: "",
          }),
        }
      );
      console.log(data);
      onAddNote();
    },
    [onAddNote]
  );

  return (
    <div className="w-full max-w-xs">
      <form className=" p-4 " onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            type="text"
            placeholder="Note Title"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}
