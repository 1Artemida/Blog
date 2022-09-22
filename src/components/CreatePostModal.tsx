import { FC, FormEvent, useState } from "react";

export interface ModalProps {
  setOpenModalCreatePost: any;
}

const CreatePostModal: FC<ModalProps> = ({ setOpenModalCreatePost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchApiCreatePost = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    };
    fetch("https://bloggy-api.herokuapp.com/posts", requestOptions).then(
      (responce) => responce.json()
    );
  };

  const changeTitle = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const changeBody = (e: FormEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  const createPostHandler = () => {
    if (title.trim() === "") {
      return alert("Title is required!");
    }
    fetchApiCreatePost();
    setOpenModalCreatePost(false);
  };

  return (
    <>
      {
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Name of post</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setOpenModalCreatePost(false)}
                ></button>
              </div>
              <input
                type="text"
                className="form-control"
                id="floatingInputValue"
                style={{ margin: "1rem 0.75rem", width: "95%" }}
                onChange={changeTitle}
              ></input>
              <div className="modal-body">
                <p>Add some text for new post</p>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    onChange={changeBody}
                    style={{ height: "180px" }}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setOpenModalCreatePost(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createPostHandler}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default CreatePostModal;
