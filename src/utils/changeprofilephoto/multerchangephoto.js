import multer from "multer";
import fs from "fs"
import path from "path";
import { allowedimages } from "../../common/constans.js";
import { error_handler } from "../../errorHandling/errorclass.js";
import crypto from "crypto"
const uploadDir = path.resolve("uploads");
const storage = multer.diskStorage(
    {
        destination: function (cb) {
            try {
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true })
                }
                cb(null, uploadDir)
            } catch (err) {
                cb(err)
            }
        },
        filename: function ( file, cb) {
            if (!file.fieldname) {
                cb(Error, true)
            }
            const ext = path.extname(path.basename(file.originalname)).toLowerCase();
            cb(null, `${crypto.randomBytes(16).toString("hex")}${ext}`);
        }
    },
)
function filefiltering(file, cb) {
    const [type, subtype] = file.mimetype.split("/")
    if (!allowedimages[type]?.includes(subtype)) {
        return cb(new error_handler("invalid file type"));
    }
    cb(null, true);
}
export const uploads = multer({
    storage: storage,
    fileFilter: filefiltering,
})
