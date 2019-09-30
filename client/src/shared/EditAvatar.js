import React, { useState } from "react";
import { useDispatch } from "react-redux";

import AvatarInput from "./AvatarInput";
import Modal from "./Modal";
import AvatarCropper from "./AvatarCropper";
import Button from "./Button";
import { updateField } from "../auth/auth.actions";

const EditAvatar = ({}) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const setFieldValue = (name, value) => setAvatar(value);

  return (
    <div>
      {editMode ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch(updateField("avatar", { avatar }));
            setEditMode(false);
          }}
        >
          <AvatarInput
            image={image}
            setImageSource={s => setSrc(s)}
            openModal={setShow}
          />
          <Modal show={show} onClose={() => setShow(false)}>
            <AvatarCropper
              src={src}
              getImage={img => setImage(img)}
              setFieldValue={setFieldValue}
            />
          </Modal>
          <Button block={false} type="submit" classes="mr-2">
            Save
          </Button>
          <Button color="red" block={false} onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </form>
      ) : (
        <div
          className="border-b-2 py-3 mt-4 cursor-pointer"
          onClick={() => setEditMode(true)}
        >
          <h3>Update your avatar</h3>
        </div>
      )}
    </div>
  );
};

export default EditAvatar;
