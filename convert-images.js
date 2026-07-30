const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./public/assets/img/directors";
const outputDir = "./public/assets/img/directors";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertFolder(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const inputPath = path.join(folder, file);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      const newOutput = path.join(outputDir, file);
      if (!fs.existsSync(newOutput)) {
        fs.mkdirSync(newOutput, { recursive: true });
      }
      continue;
    }

    const ext = path.extname(file).toLowerCase();

    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const outputPath = path.join(
        outputDir,
        path.parse(file).name + ".webp"
      );

      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`Converted: ${file}`);
    }
  }

  console.log("Done!");
}

convertFolder(inputDir);