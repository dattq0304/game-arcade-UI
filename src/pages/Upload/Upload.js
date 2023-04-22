import classNames from "classnames/bind";
import { useState, useRef } from "react";
import axios from "axios";
import jszip from "jszip";

import styles from "./Upload.module.scss";
import Button from "~/components/Button/Button";
import InputText from "~/components/InputText";
import InputSelect from "~/components/InputSelect";
import InputFolder from "~/components/InputFolder";
import InputImage from "~/components/InputImage";
import GamePlay from "~/components/GamePlay";

const cx = classNames.bind(styles);

function Upload() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const [review, setReview] = useState(false);
  const [gamePath, setGamePath] = useState("");

  const gameId = useRef("");

  const baseUrl = "http://localhost:3001/api";
  const uploadUrl = `${baseUrl}/upload`;
  const gameUrl = `${baseUrl}/game`;

  const handleChangeCoverImage = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setCoverImage(e.target.files[0]);
  };

  const categories = [
    "2 players",
    "Action",
    "Sport",
    "Puzzle",
    "Beauty",
    "Car",
    "Other",
  ];

  const gameUploadType = ["HTML5", "Iframe link"];

  const handleSelectGameUploadType = (e) => {
    setType(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setReview(true);
    await uploadInfo();
    if (type === "HTML5") {
      await uploadSourceCode();
    }
    await uploadCoverImage();
    goToPreviewGameScreen();
    console.log("id", gameId);
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

  const goToPreviewGameScreen = async () => {
    try {
      const url = `${gameUrl}/${gameId.current}`;
      const res = await axios.get(url);

      if (res.data.type === "HTML5") {
        setGamePath(`${url}/index.html`);
      } else {
        setGamePath(res.data.path);
      }

      setReview(true);
      console.log("goToPreviewGameScreen - Server:", res);
    } catch (err) {
      console.error("goToPreviewGameScreen - Client", err);
    }
  };

  const handleGobackClick = (e) => {
    setReview(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("form-container")}
        style={review ? { display: "none" } : { display: "block" }}
      >
        <h1 className={cx("title")}>Submit Game</h1>
        <form id="game-upload">
          <div className={cx("details")}>
            <h2 className={cx("details-title")}>Game details</h2>
            <InputText
              name="name"
              title="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></InputText>
            <InputSelect
              name="category"
              title="Category"
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></InputSelect>
            <InputText
              name="description"
              title="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></InputText>
            <InputText
              name="control"
              title="Control"
              value={control}
              onChange={(e) => setControl(e.target.value)}
            ></InputText>
          </div>

          <div className={cx("details")}>
            <h2 className={cx("details-title")}>Files</h2>
            <InputSelect
              name="game-type"
              title="Game type"
              options={gameUploadType}
              value={type}
              onChange={handleSelectGameUploadType}
            ></InputSelect>

            {type === "HTML5" && (
              <InputFolder
                name="source-code"
                title="Folder Upload"
                filesUploaded={filesUploaded}
                value={filesUploaded}
                setFilesUploaded={setFilesUploaded}
              ></InputFolder>
            )}

            {type === "Iframe link" && (
              <InputText
                name="iframe-link"
                title="Link"
                onChange={(e) => setLink(e.target.value)}
              ></InputText>
            )}
            <InputImage
              name="cover-image"
              title="Cover Image"
              onChange={handleChangeCoverImage}
              image={previewImage}
            ></InputImage>
          </div>

          <div className={cx("details")}>
            <div className={cx("submit-wrapper")}>
              <Button primary type="submit" onClick={handleSubmitForm}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      {review && (
        <div className={cx("review-container")}>
          <h1>Review</h1>
          <GamePlay src={gamePath}></GamePlay>
          <div className={cx("finish-review")}>
            <Button
              className={cx("go-back")}
              text
              border
              onClick={handleGobackClick}
            >
              Go Back
            </Button>
            <Button primary type="submit">
              Finish review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
