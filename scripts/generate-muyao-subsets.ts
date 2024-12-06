const path = require("path");
const fs = require("fs");
// 读取 reporter.json
const reporterPath = path.join(
  __dirname,
  "../packages/excalidraw/fonts/Muyao/dist/reporter.json",
);
const reporter = JSON.parse(fs.readFileSync(reporterPath, "utf-8"));

// 生成导入语句
const imports = reporter.data
  .map((subset, index) => `import _${index} from "./dist/${subset.name}";`)
  .join("\n");

// 生成字体描述数组
const fontFaces = reporter.data
  .map(
    (subset, index) => `  {
    uri: _${index},
    descriptors: {
      unicodeRange: "${subset.chars}",
    },
  }`,
  )
  .join(",\n");

// 生成完整的 index.ts 内容
const content = `import { type ExcalidrawFontFaceDescriptor } from "../Fonts";

${imports}

export const MuyaoFontFaces: ExcalidrawFontFaceDescriptor[] = [
${fontFaces}
];
`;

// 写入文件
const outputPath = path.join(
  __dirname,
  "../packages/excalidraw/fonts/Muyao/index.ts",
);
fs.writeFileSync(outputPath, content);

console.log("Generated Muyao font subsets index.ts");
