import React, { useEffect } from "react";
import {
  ImSpinner11,
  ImEye,
  ImFilePicture,
  ImFileEmpty,
  ImSpinner3,
} from "react-icons/im";
import { useState } from "react";
import DeviceView from "./DeviceView";
import { uploadImage } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import MarkdownHint from "./MarkdownHint";

export const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
};
const PostForm = ({
  initialPost,
  busy,
  postBtnTitle,
  resetAfterSubmit,
  onSubmit,
}) => {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");
  const [imageUrlToCopy, setImageUrlToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);
  const [showDeviceView, setShowDeviceView] = useState(false);
  const { title, content, featured, tags, meta } = postInfo;

  const { updateNotification } = useNotification();

  useEffect(() => {
    if (initialPost) {
      setPostInfo({ ...initialPost });
      setSelectedThumbnailURL(initialPost?.thumbnail);
    }
    
    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [initialPost, resetAfterSubmit]);

  const handleChange = ({ target }) => {
    // console.log(target);
    const { value, name, checked } = target;
    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image")) {
        return alert("This is not an image");
      }
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }
    if (name === "featured") {
      localStorage.setItem(
        "blogPost",
        JSON.stringify({ ...postInfo, featured: checked })
      );
      return setPostInfo({ ...postInfo, [name]: checked });
    }
    if (name === "tags") {
      const newTags = tags.split(",");
      if (newTags.length > 4)
        // console.log("You can select only four tags at a time");
        updateNotification(
          "warning",
          "You can select only four tags at a time"
        );
    }
    if (name === "meta" && meta.length >= 150) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    }
    const newPost = { ...postInfo, [name]: value };
    setPostInfo({ ...newPost });
    localStorage.setItem("blogPost", JSON.stringify(newPost));
  };
  const handleImageUpload = async ({ target }) => {
    // console.log(target);
    if (imageUploading) return;

    const file = target.files[0];
    // console.log(file);
    if (!file.type?.includes("image")) {
      return updateNotification("error", "This is not an image");
    }
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    // console.log(formData);
    const { error, image } = await uploadImage(formData);
    setImageUploading(false);
    // console.log(image);
    if (error) return updateNotification('error',error);
    
    setImageUrlToCopy(image);
  };
  const handleOnCopy = () => {
    const textToCopy = `![img alt](${imageUrlToCopy})`;
    navigator.clipboard.writeText(textToCopy);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags, meta } = postInfo;
    if (!title.trim()) return updateNotification("error", "Title is missing");
    if (!content.trim())
      return updateNotification("error", "Content is missing");
    if (!tags.trim()) return updateNotification("error", "Tags are missing");
    if (!meta.trim())
      return updateNotification("error", "Meta description is missing");
    ///Here I use regular expression for the slug
    const slug = title
      .toLocaleLowerCase()
      .replace(/[^a-zA-Z ]/g, " ")
      .split(" ")
      .filter((item) => item.trim())
      .join("-");

    const newTags = tags
      .split(",")
      .map((item) => item.trim())
      .splice(0, 4);

    const formData = new FormData();
    const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };
    for (let key in finalPost) {
      formData.append(key, finalPost[key]);
    }
    onSubmit(formData);
    if (resetAfterSubmit) resetForm();
  };
  const resetForm = () => {
    setPostInfo({ ...defaultPost });
    localStorage.removeItem("blogPost");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="p-2 flex">
        <div className="w-9/12 h-screen space-y-3 flex flex-col">
          {/* title and submit */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">
              Create New Post
            </h1>
            <div className="flex items-center space-x-5">
              <button
                onClick={resetForm}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 transition
              ring-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded h-10"
              >
                <ImSpinner11 />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setShowDeviceView(true)}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 transition
              ring-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded h-10"
              >
                <ImEye />
                <span>View</span>
              </button>
              <button
                className="h-10 w-36 hover:ring-1 bg-blue-500 rounded
                text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition"
              >
                <span>
                  {busy ? (
                    <ImSpinner3 className="animate-spin mx-auto text-xl" />
                  ) : (
                    postBtnTitle
                  )}
                </span>
              </button>
            </div>
          </div>
          {/* featured check box */}
          <div className="flex">
            <input
              id="featured"
              name="featured"
              value={featured}
              type="checkbox"
              onChange={handleChange}
              hidden
            />
            <label
              className="select-none flex items-center 
            space-x-2 text-gray-700
            cursor-pointer group"
              htmlFor="featured"
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-blue-500 
              flex items-center justify-center group-hover:border-blue-500"
              >
                {featured && (
                  <div
                    className="w-2 h-2 rounded-full bg-gray-700
                group-hover:bg-blue-500"
                  />
                )}
              </div>
              <span className="group-hover:text-blue-500">Featured</span>
            </label>
          </div>
          {/* title input */}
          <input
            value={title}
            name="title"
            onFocus={() => setDisplayMarkdownHint(false)}
            onChange={handleChange}
            type="text"
            className="text-xl outline-none
            focus:ring-1 rounded p-2 w-full font-semibold"
            placeholder="Post title"
          />
          {/* image input */}
          <div className="flex space-x-2">
            <div>
              <input
                onChange={handleImageUpload}
                id="image-input"
                type="file"
                hidden
              />
              <label
                htmlFor="image-input"
                className="flex items-center space-x-2 px-3 ring-1 
                    transition ring-gray-500 text-gray-500
                    cursor-pointer hover:bg-gray-500 hover:text-white rounded h-10"
              >
                <span>Place Image</span>
                {!imageUploading ? (
                  <ImFilePicture />
                ) : (
                  <ImSpinner3 className="animate-spin" />
                )}
              </label>
            </div>

            {imageUrlToCopy && (
              <div
                className="flex flex-1 justify-between
            rounded overflow-hidden bg-gray-400"
              >
                <input
                  type="text"
                  value={imageUrlToCopy}
                  className="bg-transparent px-2 text-white w-full"
                  disabled
                />
                <button
                  onClick={handleOnCopy}
                  type="button"
                  className="text-xs flex flex-col justify-center 
              self-stretch items-center p-1 bg-gray-700 text-white"
                >
                  <ImFileEmpty />
                  <span>Copy</span>
                </button>
              </div>
            )}
          </div>
          {/* textarea input */}
          <textarea
            value={content}
            name="content"
            onChange={handleChange}
            onFocus={() => setDisplayMarkdownHint(true)}
            className="resize-none outline-none
            focus:ring-1 rounded p-2 w-full flex-1 font-semibold"
            placeholder="Hello "
          ></textarea>
          {/* tags input */}
          <div>
            <label className="text-gray-500" htmlFor="tags">
              Tags
            </label>
            <input
              value={tags}
              name="tags"
              onChange={handleChange}
              type="text"
              id="tags"
              className="outline-none
              focus:ring-1 rounded p-2 w-full"
              placeholder="Tag one, Tag two"
            />
          </div>
          {/* meta description input */}
          <div>
            <label className="text-gray-500" htmlFor="meta">
              Meta description {meta?.length}/150
            </label>
            <textarea
              value={meta}
              name="meta"
              onChange={handleChange}
              id="meta"
              className="outline-none
              focus:ring-1 rounded p-2 w-full h-28"
              placeholder="Meta Description"
            ></textarea>
          </div>
        </div>
        <div className="w-1/4 px-2 relative">
          <h1
            className="text-xl font-semibold 
          text-gray-700 mb-3"
          >
            Thumbnail
          </h1>
          <div>
            <input
              onChange={handleChange}
              name="thumbnail"
              type="file"
              id="thumbnail"
              hidden
            />
            <label className="cursor-pointer" htmlFor="thumbnail">
              {selectedThumbnailURL ? (
                <img
                  src={selectedThumbnailURL}
                  className="aspect-video shadow-sm"
                  alt=""
                />
              ) : (
                <div
                  className="border border-dashed
              aspect-video border-gray-500 text-gray-500
              flex flex-col justify-center items-center"
                >
                  <span>Select Thumbnail</span>
                  <span className="text-xs">Recommended Size</span>
                  <span className="text-xs">1280 * 720</span>
                </div>
              )}
            </label>
          </div>
          {/* Markdown Rules */}
          <div
            className="absolute top-1/2
          -translate-y-1/2"
          >
            {displayMarkdownHint && <MarkdownHint />}
          </div>
        </div>
      </form>
      <DeviceView
        title={title}
        content={content}
        thumbnail={selectedThumbnailURL}
        visible={showDeviceView}
        onClose={()=>setShowDeviceView(false)}
      />
    </>
  );
};

export default PostForm;
