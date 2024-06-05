import {execSync} from 'child_process'
export function installSourceMapper() {
    execSync("go install github.com/denandz/sourcemapper@latest")
}