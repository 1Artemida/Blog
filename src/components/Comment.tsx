import { FC, FormEvent, useEffect, useState } from "react";

interface Comment {
  postId: number;
  body: string;
}

const Comment: FC<Comment> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");

  const fetchApiComments = async () => {
    const responce: Comment[] = await fetch(
      "https://bloggy-api.herokuapp.com/comments/"
    ).then((responce) => responce.json());

    setComments(
      responce.filter(
        (comment: { postId: number }) => comment.postId === postId
      )
    );
  };

  const fetchApiCreateComment = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, body }),
    };

    fetch("https://bloggy-api.herokuapp.com/comments", requestOptions).then(
      () => fetchApiComments()
    );
  };

  const createCommentHandler = () => {
    if (body.trim() === "") {
      return alert("Comment is required!");
    }

    fetchApiCreateComment();
  };

  const changeBody = (e: FormEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  useEffect(() => {
    if (postId) {
      fetchApiComments();
    }
  }, [postId]);

  return (
    <>
      <div className="comments">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          onChange={changeBody}
          style={{ height: "150px" }}
        ></textarea>
        <button
          type="button"
          className="btn btn-primary"
          onClick={createCommentHandler}
          style={{ margin: "10px" }}
        >
          Comment...
        </button>
        {comments &&
          comments.map((comment) => (
            <>
              <div className="card card-body" style={{ marginTop: "30px" }}>
                {comment.body}
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Comment;
