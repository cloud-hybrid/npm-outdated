#!/usr/bin/env node

/***
 * @name        npm-outdated
 *
 * @module      Module
 * @version     0.0.1 (Documentation)
 * @summary     Check NPM for Update(s)
 *
 * @author      Jacob B. Sanders
 * @license     BSD 3-Clause License
 * @copyright   Cloud-Technology LLC. & Affiliates.
 *
 * @package     {@link https://github.com/cloud-hybrid/cloud-technology @cloud-technology}
 *
 * @example
 *      // via package.json
 *      $ npm run start
 *
 *      // via node_modules
 *      $ ./node_modules/.bin/npm-check-outdated
 *
 *      // via $PATH
 *      $ npm-check-outdated
 *
 */

import Runtime from "process";
import Child from "child_process";

const Process = Child.spawn;

const Subprocess = Process(
    "npm", [
        "outdated"
    ]
);

const Output = Subprocess.stdout;
const Error = Subprocess.stderr;

Output.on("data", async (_) => {
    let Allocation = 0;

    // Allocate --> Array Buffer of (n + 1) Bytes
    const Buffer = await _;
    new Array(Buffer[Symbol.iterator]).forEach(
        (_) => Allocation += 1
    );

    // Shift <-- Left to Release Empty Byte for String[0]
    const Output = Buffer.toString("UTF-8", Allocation - 1);

    Runtime.stdout.write(Output);
});

Error.on("data", async (_) => {
    let Allocation = 0;

    // Allocate an Array Buffer of (n + 1) Bytes
    const Buffer = await _;
    new Array(Buffer[Symbol.iterator]).forEach(
        (_) => Allocation += 1
    );

    // Shift <-- Left to Release Empty Byte for String[0]
    const Output = Buffer.toString("UTF-8", Allocation - 1);

    Runtime.stdout.write(Output);
});

Subprocess.on("error", (_) => {
    console.error("Error", JSON.stringify(
        _, null, 4)
    );
});

Subprocess.on("close", (code) => {
    if (code !== 0) {
        console.warn("\n" + "[Warning], Update(s) are Available");
        console.warn("  - Ensure to Push Change(s) to Remote before Updating!");
        console.warn("");
        console.warn("git add --all");
        console.warn("git commit --message \"Pre-Package Update(s)\"");
        console.warn("git push [--set-upstream origin {...}] ");

        process.exit(0);
    } else {
        console.log("No Package(s) Available for Update(s)" + "\n");

        console.debug("[Debug] Exit Status Code" + ":", code);
    }
});
