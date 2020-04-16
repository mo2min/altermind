import React from "react";
import { spawn } from "child_process";

export default function Header() {
  const someSpawn = async () => {
    /*
    const sync_exec = window
      .require("util")
      .promisify(window.require("child_process").exec);
    let result = await sync_exec(`cd repo; git push origin master`, {
      shell: "powershell.exe",
    });
    console.log("done", result);
    */
    const myspawn = window.require("child_process").spawn as typeof spawn;
    const pwrSpawn = myspawn("powershell.exe", ["cd repo;pwd"]);

    pwrSpawn.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });

    pwrSpawn.stderr.on("data", (data: any) => {
      console.error(`stderr: ${data}`);
    });

    pwrSpawn.on("close", (code: any) => {
      console.log(`child process exited with code ${code}`);
    });

    // Use spawn to commit changes
    const gitSpawn = myspawn("git", ["commit", "-am", "" + Date.now()], {
      cwd: "D:\\devhome\\altermind\\repo",
    });

    gitSpawn.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });

    gitSpawn.stderr.on("data", (data: any) => {
      console.error(`stderr: ${data}`);
    });
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
      <div> LOGO </div>
      <div>
        <button
          onClick={() => {
            console.log("Welcome ya Basha");
          }}
          className="px-2 py-1 rounded-lg bg-green-400 text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Hello
        </button>
        <button
          onClick={someSpawn}
          className="mx-2 px-2 py-1 rounded-lg text-green-800 text-xl font-light uppercase shadow-md hover:shadow-lg"
        >
          Sync
        </button>
      </div>

      <div>
        <button type="button" className="block text-gray-500 hover:text-white">
          <svg
            viewBox="0 0 100 80"
            width="40"
            height="40"
            className="fill-current"
          >
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </button>
      </div>
    </div>
  );
}
