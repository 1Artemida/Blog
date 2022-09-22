import { FC, FormEvent, useEffect, useState } from "react";

export interface ModalProps {
  id: number;
  title: string;
  body: string;
  setOpenModalEditPost: any;
  fetchApiPosts: () => void;
}

const EditPostModal: FC<ModalProps> = ({
  id,
  title,
  body,
  setOpenModalEditPost,
  fetchApiPosts,
}) => {
  const [titlePost, setTitlePost] = useState(title);
  const [bodyPost, setBodyPost] = useState(body);

  const fetchApiEditPost = async (id: number) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titlePost, body: bodyPost }),
    };
    fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, requestOptions).then(
      () => fetchApiPosts()
    );
  };

  const changeTitle = (e: FormEvent<HTMLInputElement>) => {
    setTitlePost(e.currentTarget.value);
  };

  const changeBody = (e: FormEvent<HTMLTextAreaElement>) => {
    setBodyPost(e.currentTarget.value);
  };

  const editPostHandler = () => {
    fetchApiEditPost(id);
    setOpenModalEditPost(false);
  };

  return (
    <>
      {
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change name </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setOpenModalEditPost(false)}
                ></button>
              </div>
              <input
                type="text"
                className="form-control"
                id="floatingInputValue"
                style={{ margin: "1rem 0.75rem", width: "95%" }}
                value={titlePost}
                onChange={changeTitle}
              ></input>
              <div className="modal-body">
                <p>Change Description</p>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    value={bodyPost}
                    onChange={changeBody}
                    style={{ height: "200px" }}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setOpenModalEditPost(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editPostHandler()}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default EditPostModal;
