import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import classNames from "classnames/bind";
import jszip from "jszip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./Edit.module.scss";
import Button from "~/components/Button/Button";
import InputText from "~/components/InputText";
import InputSelect from "~/components/InputSelect";
import InputFolder from "~/components/InputFolder";
import InputImage from "~/components/InputImage";
import * as GameServices from "~/api/services/game";
import * as UploadServices from "~/api/services/upload";
import { UserContext } from "~/store/userContext";

const cx = classNames.bind(styles);

function Edit() {
  const user = useContext(UserContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [control, setControl] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [coverImage, setCoverImage] = useState(null);
  const { id: gameId } = useParams();
  console.log(gameId);
  const coverImageUrl = `${process.env.REACT_APP_API_URL}/game/image`;

  useEffect(() => {
    const getGameInfo = async () => {
      const game = await GameServices.getGameById(gameId);
      setName(game.name);
      setCategory(game.category);
      setControl(game.control);
      setDescription(game.description);
      setType(game.type);
      if (game.type === 'Iframe link') {
        setLink(game.path);
      }
      setPreviewImage(`${coverImageUrl}/${gameId}`);
    }
    if (gameId) {
      getGameInfo();
    }
  }, []);

  const goToPreviewGameScreen = () => {
    const newWindow = window.open(`/upload/demo/${gameId}`, "_blank");

    const intervalId = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(intervalId);
        return <Navigate to={`/edit/${gameId}`} />;
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
    await updateInfo();
    if (type === "HTML5") {
      await updateSourceCode();
    }
    await updateCoverImage();
    goToPreviewGameScreen();
    console.log("id", gameId);
  };

  const updateInfo = async () => {
    await UploadServices.updateInfo({
      userId: user._id,
      name: name,
      category: category,
      description: description,
      control: control,
      type: type,
      link: link,
      gameId: gameId
    });
  };

  const updateSourceCode = async () => {
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
      gameId: gameId
    });
  };


  const updateCoverImage = async () => {
    await UploadServices.uploadCoverImage({
      coverImage: coverImage,
      gameId: gameId
    });
  };

  const handleGobackClick = (e) => {
    window.close();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-container")}>
        <div className={cx('header')}>
          <h1 className={cx("title")}>Edit Game</h1>
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
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
