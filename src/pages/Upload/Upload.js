import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./Upload.module.scss";
import Button from "~/components/Button/Button";
import InputText from "~/components/InputText";
import InputSelect from "~/components/InputSelect";
import InputFiles from "~/components/InputFiles";
import InputImage from "~/components/InputImage";

const cx = classNames.bind(styles);

function Upload() {
  const [image, setImage] = useState();
  const [selectedGameUploadType, setSelectedGameUploadType] = useState("");

  const handleChangeImage = (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const category = [
    "2 players",
    "Action",
    "Sport",
    "Puzzle",
    "Beauty",
    "Car",
    "Other",
  ];

  const gameUploadType = ["HTML5", "iframe link"];

  const handleSelectGameUploadType = (e) => {
    setSelectedGameUploadType(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h1 className={cx("title")}>Submit Game</h1>
        <form id="game-upload">
          <div className={cx("details")}>
            <h2 className={cx("details-title")}>Game details</h2>
            <InputText title="Name"></InputText>
            <InputSelect title="Category" options={category}></InputSelect>
            <InputText title="Description"></InputText>
            <InputText title="Control"></InputText>
          </div>

          <div className={cx("details")}>
            <h2 className={cx("details-title")}>Files</h2>
            <InputSelect
              title="Game type"
              options={gameUploadType}
              onChange={handleSelectGameUploadType}
            ></InputSelect>

            {selectedGameUploadType === "HTML5" && (
              <InputFiles
                title="Files Upload"
                description='Upload all game files. Make sure you have "index.html" as
                    entry point for your game. You can drag & drop folders here.'
              ></InputFiles>
            )}

            {selectedGameUploadType === "iframe link" && (
              <InputText title="Link"></InputText>
            )}
            <InputImage
              title="Cover Image"
              description='Upload a cover image of your game. This can be a stylized
                  image containing your game art and title. A cover should at
                  least be 712 pixels wide and 400 pixels high. The cover should
                  not include any "Play" or "Start" button or any mobile app
                  icons.'
              onChange={handleChangeImage}
              image={image}
            ></InputImage>
          </div>

          <div className={cx("details")}>
            <div className={cx("submit-wrapper")}>
              <Button primary type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
