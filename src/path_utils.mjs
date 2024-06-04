import {exec} from "node:child_process";

export async function getGoPath()  {
    return new Promise((resolve, reject)  => {
        exec("id -un", (error, stdout, stderr) => {
            if (error) {
                console.error(`getGoPath-err` , error)
                reject(error)
            } else {
                console.error(`getGoPath-stdout` , stdout)
                resolve(`/home/${stdout.trim()}/go/bin`)
            }
        });
    })
}

