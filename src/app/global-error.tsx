"use client";

import Image from "next/image";

export default function GlobalError() {
  return (
    <html>
      <body className="h-screen flex items-center justify-center">
        <Image
          src={"/images/global-error.gif"}
          width={480}
          height={360}
          alt="error-gif"
        />
      </body>
    </html>
  );
}
