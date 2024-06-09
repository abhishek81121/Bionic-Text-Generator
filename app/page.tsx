"use client";
import { BackgroundBeams } from "@/components/background-beams";
import { TextGenerateEffect } from "@/components/text-generate";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function Home() {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleButtonClick = () => {
    // Programmatically trigger the file input click event
    if (fileInputRef.current) fileInputRef.current.click();
  };
  return (
    <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center  antialiased">
      <div className="p-4 text-center relative z-10">
        <TextGenerateEffect className="" words="BIONIC TEXT GENERATOR" />
        <div className="text-lg pt-10 capitalize">
          {" "}
          Copy and paste the text you want to generate the bionic text for
        </div>

        <Textarea
          label="Paste Your Text here"
          placeholder="Text Here"
          className="sm:min-w-screen min-w-screen mt-10"
        />
        <Divider
          orientation="horizontal"
          className="mt-10 h-1"
          style={{ width: "80vw" }}
        ></Divider>
        <Button className="mt-10" onClick={handleButtonClick}>
          Upload File
        </Button>
        <input type="file" className="hidden" ref={fileInputRef}></input>
      </div>

      <BackgroundBeams />
    </div>
  );
}
