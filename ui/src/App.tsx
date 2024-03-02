import React from "react";
function App() {
  return (
    <div className="">
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="font-bold max-w-xl my-4">
          Ho ho ho, what you want for Christmas?
        </p>
        who are you?
        <input
          name="userid"
          placeholder="charlie.brown"
          className="block mb-2 p-1 w-72 border border-gray-300 rounded text-base"
        />
        <form method="post">
          what do you want for christmas?
          <textarea
            className="block mb-2 p-1 w-72 border border-gray-300 rounded text-base"
            name="wish"
            rows={10}
            cols={45}
            maxLength={100}
            placeholder="Gifts!"
          ></textarea>
          <br />
          <button
            type="submit"
            id="submit-letter"
            className="px-1.5 py-0.4 text-base bg-gray-300 border border-gray-500 shadow-button cursor-pointer hover:bg-yellow-500 active:shadow-none "
          >
            Send
          </button>
        </form>
      </main>

      <footer className="mt-12 pt-6 border-t border-gray-300">
        Made with
        <a href="https://glitch.com">Glitch</a>!
      </footer>
    </div>
  );
}

export default App;
