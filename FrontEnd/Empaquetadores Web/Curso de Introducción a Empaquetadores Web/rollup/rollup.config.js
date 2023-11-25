import html from "@rollup/plugin-html";
import copy from "rollup-plugin-copy";
import image from "@rollup/plugin-image";
// import css from "rollup-plugin-css-only";

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "es",
        sourcemap: true
    },
    plugins: [
        copy({
            targets: [
                {
                    src: "src/assets/**/*",
                    dist: "dist/assets",
                }
            ]
        }),
        // css({
        //     output: 'bundle.css'
        // }),
        html(),
        image(),
    ]
}