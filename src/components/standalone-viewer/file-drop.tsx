import { Dropzone } from "@mantine/dropzone";

const FileDrop = ({ onDrop }: any) => {
  return (
    <Dropzone
      style={{
        border: "1px solid var(--app-shell-border-color)",
      }}
      onDrop={onDrop}
      onReject={(files) => console.log("rejected files", files)}
      // maxSize={5 * 3024 ** 2}
      // multiple
    >
      Drag images here or click to select files
    </Dropzone>
  );
};

export default FileDrop;
