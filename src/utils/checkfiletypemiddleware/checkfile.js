
import { allowedimages } from "../../common/constans.js"
import { fileTypeFromFile } from "file-type"
import { error_handler } from "../../errorHandling/errorclass.js"
import fs from "fs"
export async function check_file_type(req, next) {
    const filePath = req.file.path
    if (!filePath) throw new error_handler("invalid file type", 400)
    try {
        const originalfiletype = await fileTypeFromFile(filePath)
        if (!originalfiletype) {
            throw new error_handler("invalid file type", 400)
        }
        const { mime } = originalfiletype
        const [type, extname] = mime.split("/")
        if (!allowedimages[type]?.includes(extname)) {
            fs.unlinkSync(filePath)
            throw new error_handler("invalid file type", 400)
        }
        next()
    } catch (err) {
        next(err)
    }
}