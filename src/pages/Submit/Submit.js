import { useState, useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import classNames from "classnames/bind";
import jszip, { file } from "jszip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import * as UploadServices from "~/api/services/upload";

import styles from "./Submit.module.scss";
import Button from "~/components/Button/Button";
import InputText from "~/components/InputText";
import InputSelect from "~/components/InputSelect";
import InputFolder from "~/components/InputFolder";
import InputImage from "~/components/InputImage";
import { UserContext } from "~/store/userContext";

const cx = classNames.bind(styles);

function Submit() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hide");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("");
  const [type, setType] = useState("hide");
  const [link, setLink] = useState("");
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = useContext(UserContext);
  const gameId = useRef("");

  const goToPreviewGameScreen = () => {
    const newWindow = window.open(`/upload/demo/${gameId.current}`, "_blank");

    const intervalId = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(intervalId);
        return <Navigate to={`/edit/${gameId.current}`} />;
      }
    }, 1000);
  };

  const handleChangeCoverImage = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setCoverImage(e.target.files[0]);
  };

  const categories = [
    "Action",
    "Sport",
    "Quiz",
    "Gun",
    "Puzzle",
    "Beauty",
    "Gambling",
    "Car",
    "Bike",
    "Jet Fighter",
    "2 players",
    "Minecraft",
    "Other",
  ];

  const gameUploadType = ["HTML5", "Iframe link"];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      alert("Please enter the game name");
      return;
    }
    if (categories === "hide") {
      alert("Please select the game category");
      return;
    }
    if (type === "hide") {
      alert("Please select the game type");
      return;
    }
    if (type === "Iframe link" && link.trim().length === 0) {
      alert("Please enter the game link");
      return;
    }
    if (type === "HTML5" && filesUploaded.length === 0) {
      alert("Please upload the game files");
      return;
    }
    if (!coverImage) {
      alert("Please upload the game cover image");
      return;
    }
    setIsSubmitted(true);
    await uploadInfo();
    if (type === "HTML5") {
      await uploadSourceCode();
    }
    await uploadCoverImage();
    goToPreviewGameScreen();
    console.log("id", gameId.current);
  };

  const uploadInfo = async () => {
    if (gameId.current === "") {
      const res = await UploadServices.uploadInfo({
        userId: user._id,
        name: name,
        category: category,
        description: description,
        control: control,
        type: type,
        link: link,
      });
      gameId.current = res._id;
    } else {
      await UploadServices.updateInfo({
        userId: user._id,
        name: name,
        category: category,
        description: description,
        control: control,
        type: type,
        link: link,
        gameId: gameId.current
      });
    }
  };

  const uploadSourceCode = async () => {
    const zip = new jszip();
    await Promise.all(
      filesUploaded.map(async (file) => {
        const data = await file.arrayBuffer();
        zip.file(file.webkitRelativePath, data);
      })
    );
    const zipData = await zip.generateAsync({ type: "arraybuffer" });
    const zipFile = new File([zipData], "upload.zip");
    UploadServices.uploadSourceCode({
      zipFile: zipFile,
      gameId: gameId.current
    });
  };

  const uploadCoverImage = async () => {
    await UploadServices.uploadCoverImage({
      coverImage: coverImage,
      gameId: gameId.current
    });
  };

  const handleGobackClick = (e) => {
    window.close();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-container")}>
        <div className={cx('header')}>
          <h1 className={cx("title")}>Submit Game</h1>
          <Button
            leftIcon={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
            text
            border
            to="/upload"
            onClick={handleGobackClick}
          >
            Back
          </Button>
        </div>
        <form id="game-upload">
          <div className={cx("details")}>
            <h2 className={cx("details-title")}>Game details</h2>
            <InputText
              className={cx("input-field")}
              name="name"
              title="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></InputText>
            <InputSelect
              className={cx("input-field")}
              name="category"
              title="Category"
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></InputSelect>
            <InputText
              className={cx("input-field")}
              name="description"
              title="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></InputText>
            <InputText
              className={cx("input-field")}
              name="control"
              title="Control"
              value={control}
              onChange={(e) => setControl(e.target.value)}
            ></InputText>
          </div>

          <div className={cx("details")}>
            <h2 className={cx("details-title")}>Files</h2>
            <InputSelect
              className={cx("input-field")}
              name="game-type"
              title="Game type"
              options={gameUploadType}
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></InputSelect>

            {type === "HTML5" && (
              <InputFolder
                className={cx("input-field")}
                name="source-code"
                title="Folder Upload"
                filesUploaded={filesUploaded}
                setFilesUploaded={setFilesUploaded}
              ></InputFolder>
            )}

            {type === "Iframe link" && (
              <InputText
                className={cx("input-field")}
                name="iframe-link"
                title="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              ></InputText>
            )}
            <InputImage
              className={cx("input-field")}
              name="cover-image"
              title="Cover Image"
              onChange={handleChangeCoverImage}
              image={previewImage}
            ></InputImage>
          </div>

          <div className={cx("details")}>
            <div className={cx("submit-wrapper")}>
              <Button primary type="submit" onClick={handleSubmitForm}>
                {isSubmitted ? "Update" : "Upload"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Submit;
