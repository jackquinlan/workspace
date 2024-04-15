import { generateUploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

/* Export UploadButton from Uploadthing */
export const UploadButton = generateUploadButton<OurFileRouter>();
