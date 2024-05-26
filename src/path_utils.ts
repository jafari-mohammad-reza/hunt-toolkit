import {exec} from "node:child_process";

export async function getGoPath()  {
    return new Promise((resolve, reject)  => {
        exec("id -un", (error, stdout, stderr) => {
            if (error) {
                reject(error)
            } else {
                resolve(`/home/${stdout}/go/bin`)
            }
        });
    })
}

