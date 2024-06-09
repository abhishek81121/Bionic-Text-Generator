"use client";
import { BackgroundBeams } from "@/components/background-beams";
import { TextGenerateEffect } from "@/components/text-generate";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

export default function Home() {
  const [file, setFile] = useState<File>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setVisible] = useState(false);

  const [fileContent, setFileContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        if (e.target.files[0].name.slice(-3) != "txt") {
          setVisible(true);
          console.log("unsupported format");
        } else {
          setFile(e.target.files[0]);
          const file = e.target.files[0];
          if (file) {
            const text = await file.text();
            setFileContent(text);
          }
        }
      }
    } catch (err) {}
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
          className="sm:min-w-screen lg:w-3/4 mt-10 position relative left mx-auto"
        />
        <Divider
          orientation="horizontal"
          className="mt-10 h-1 mx-auto"
          style={{ width: "80vw" }}
        ></Divider>
        <Button className="mt-10" onClick={handleButtonClick}>
          Upload File
        </Button>

        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".txt"
          ref={fileInputRef}
        ></input>
        <br></br>
        <br></br>

        <span>{file ? `${file.name}` : ""}</span>
        <Divider
          orientation="horizontal"
          className="mt-10 h-1 mx-auto"
          style={{ width: "80vw" }}
        ></Divider>
      </div>
      <Modal isOpen={isVisible} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Unsupported File Format
              </ModalHeader>
              <ModalBody>Only Text File Is Supported For Now</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setVisible(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <BackgroundBeams />
    </div>
  );
}
