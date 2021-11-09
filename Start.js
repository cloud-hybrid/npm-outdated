/***
 *
 * @type {NodeJS.Process}
 *
***/

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

Subprocess.on("close", (_) => console.log("Exit Code: " + String(_)));

