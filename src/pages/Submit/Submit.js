import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import classNames from "classnames/bind";
import axios from "axios";
import jszip from "jszip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./Submit.module.scss";
import Button from "~/components/Button/Button";
import InputText from "~/components/InputText";
import InputSelect from "~/components/InputSelect";
import InputFolder from "~/components/InputFolder";
import InputImage from "~/components/InputImage";

const cx = classNames.bind(styles);

function Submit() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const gameId = useRef("");

  const baseUrl = "http://localhost:3001/api";
  const uploadUrl = `${baseUrl}/upload`;

  const goToPreviewGameScreen = () => {
    const newWindow = window.open(`/demo/${gameId.current}`, "_blank");

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

  const handleSelectGameUploadType = (e) => {
    setType(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
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
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("control", control);
      formData.append("type", type);
      if (type === "Iframe link") formData.append("link", link);

      if (gameId.current === "") {
        const res = await axios.post(`${uploadUrl}/info`, formData);
        gameId.current = res.data._id;
        console.log("uploadInfo - Server:", res);
      } else {
        const urlencoded = new URLSearchParams(formData).toString();
        const res = await axios.put(
          `http://localhost:3001/api/game/${gameId.current}`,
          urlencoded,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log("updateInfo - Server:", res);
      }
    } catch (err) {
      console.error("upload/Update Info - Client", err);
    }
  };

  const uploadSourceCode = async () => {
    try {
      const zip = new jszip();
      await Promise.all(
        filesUploaded.map(async (file) => {
          const data = await file.arrayBuffer();
          zip.file(file.webkitRelativePath, data);
        })
      );
      const zipData = await zip.generateAsync({ type: "arraybuffer" });
      const zipFile = new File([zipData], "upload.zip");
      const formData = new FormData();
      formData.append("source-code", zipFile);

      const res = await axios.post(
        `${uploadUrl}/source-code/${gameId.current}`,
        formData
      );

      console.log("uploadSourceCode - Server:", res);
    } catch (err) {
      console.error("uploadSourceCode - Client", err);
    }
  };

  const uploadCoverImage = async () => {
    try {
      const formData = new FormData();
      formData.append("cover-image", coverImage);

      const res = await axios.post(
        `${uploadUrl}/cover-image/${gameId.current}`,
        formData
      );
      console.log("uploadCoverImage - Server:", res);
    } catch (err) {
      console.error("uploadCoverImage - Client", err);
    }
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
              onChange={(e) => setName(e.target.value)}
            ></InputText>
            <InputSelect
              className={cx("input-field")}
              name="category"
              title="Category"
              options={categories}
              onChange={(e) => setCategory(e.target.value)}
            ></InputSelect>
            <InputText
              className={cx("input-field")}
              name="description"
              title="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></InputText>
            <InputText
              className={cx("input-field")}
              name="control"
              title="Control"
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
              onChange={handleSelectGameUploadType}
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
