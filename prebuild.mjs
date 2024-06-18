import https from "https"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schemaUrl =
  "https://raw.githubusercontent.com/gfargo/coco/main/schema.json"
const outputPath = path.join(__dirname, "public", "schema.json")

https
  .get(schemaUrl, (response) => {
    // Check for a successful response
    if (response.statusCode !== 200) {
      console.error(`Failed to download schema: ${response.statusCode}`)
      return
    }

    // Pipe the response stream to a file
    const fileStream = fs.createWriteStream(outputPath)
    response.pipe(fileStream)

    fileStream.on("finish", () => {
      fileStream.close()
      console.log("schema downloaded successfully")
    })
  })
  .on("error", (error) => {
    console.error(`Error: ${error.message}`)
  })
