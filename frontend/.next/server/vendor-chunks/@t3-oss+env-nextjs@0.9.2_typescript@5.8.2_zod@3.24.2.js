"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@t3-oss+env-nextjs@0.9.2_typescript@5.8.2_zod@3.24.2";
exports.ids = ["vendor-chunks/@t3-oss+env-nextjs@0.9.2_typescript@5.8.2_zod@3.24.2"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@t3-oss+env-nextjs@0.9.2_typescript@5.8.2_zod@3.24.2/node_modules/@t3-oss/env-nextjs/dist/index.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@t3-oss+env-nextjs@0.9.2_typescript@5.8.2_zod@3.24.2/node_modules/@t3-oss/env-nextjs/dist/index.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnv: () => (/* binding */ createEnv)\n/* harmony export */ });\n/* harmony import */ var _t3_oss_env_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @t3-oss/env-core */ \"(rsc)/./node_modules/.pnpm/@t3-oss+env-core@0.9.2_typescript@5.8.2_zod@3.24.2/node_modules/@t3-oss/env-core/dist/index.js\");\n\n\nconst CLIENT_PREFIX = \"NEXT_PUBLIC_\";\nfunction createEnv(opts) {\n    const client = typeof opts.client === \"object\" ? opts.client : {};\n    const server = typeof opts.server === \"object\" ? opts.server : {};\n    const shared = opts.shared;\n    const runtimeEnv = opts.runtimeEnv ? opts.runtimeEnv : {\n        ...process.env,\n        ...opts.experimental__runtimeEnv\n    };\n    return (0,_t3_oss_env_core__WEBPACK_IMPORTED_MODULE_0__.createEnv)({\n        ...opts,\n        shared,\n        client,\n        server,\n        clientPrefix: CLIENT_PREFIX,\n        runtimeEnv\n    });\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHQzLW9zcytlbnYtbmV4dGpzQDAuOS4yX3R5cGVzY3JpcHRANS44LjJfem9kQDMuMjQuMi9ub2RlX21vZHVsZXMvQHQzLW9zcy9lbnYtbmV4dGpzL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEQ7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMkRBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVxQiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtcm91dGVyLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0B0My1vc3MrZW52LW5leHRqc0AwLjkuMl90eXBlc2NyaXB0QDUuOC4yX3pvZEAzLjI0LjIvbm9kZV9tb2R1bGVzL0B0My1vc3MvZW52LW5leHRqcy9kaXN0L2luZGV4LmpzP2Q4ZjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRW52IGFzIGNyZWF0ZUVudiQxIH0gZnJvbSAnQHQzLW9zcy9lbnYtY29yZSc7XG5cbmNvbnN0IENMSUVOVF9QUkVGSVggPSBcIk5FWFRfUFVCTElDX1wiO1xuZnVuY3Rpb24gY3JlYXRlRW52KG9wdHMpIHtcbiAgICBjb25zdCBjbGllbnQgPSB0eXBlb2Ygb3B0cy5jbGllbnQgPT09IFwib2JqZWN0XCIgPyBvcHRzLmNsaWVudCA6IHt9O1xuICAgIGNvbnN0IHNlcnZlciA9IHR5cGVvZiBvcHRzLnNlcnZlciA9PT0gXCJvYmplY3RcIiA/IG9wdHMuc2VydmVyIDoge307XG4gICAgY29uc3Qgc2hhcmVkID0gb3B0cy5zaGFyZWQ7XG4gICAgY29uc3QgcnVudGltZUVudiA9IG9wdHMucnVudGltZUVudiA/IG9wdHMucnVudGltZUVudiA6IHtcbiAgICAgICAgLi4ucHJvY2Vzcy5lbnYsXG4gICAgICAgIC4uLm9wdHMuZXhwZXJpbWVudGFsX19ydW50aW1lRW52XG4gICAgfTtcbiAgICByZXR1cm4gY3JlYXRlRW52JDEoe1xuICAgICAgICAuLi5vcHRzLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIGNsaWVudCxcbiAgICAgICAgc2VydmVyLFxuICAgICAgICBjbGllbnRQcmVmaXg6IENMSUVOVF9QUkVGSVgsXG4gICAgICAgIHJ1bnRpbWVFbnZcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlRW52IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@t3-oss+env-nextjs@0.9.2_typescript@5.8.2_zod@3.24.2/node_modules/@t3-oss/env-nextjs/dist/index.js\n");

/***/ })

};
;