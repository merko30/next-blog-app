import getBase64 from "utils/getBase64";

const AvatarInput = ({ image, openModal, setImageSource }) => {
  return (
    <div className="my-2">
      {image && (
        <img
          src={image}
          alt="avatar"
          className="rounded-full my-4"
          style={{ width: "200px", height: "200px" }}
        />
      )}
      <label className="block mb-1">Avatar</label>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            openModal(true);
            getBase64(e.target.files[0], setImageSource);

            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default AvatarInput;
