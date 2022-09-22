import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";

interface Post {
  id: number;
  title: string;
  body: string;
  comments: [];
}

const PageSinglePost: FC<Post> = () => {
  const params = useParams();
  const [post, setPost] = useState<Post>({} as Post);

  const fetchApiPostById = async () => {
    const responce = await fetch(
      `https://bloggy-api.herokuapp.com/posts/${params.id}?_embed=comments`
    ).then((responce) => responce.json());

    setPost(responce);
  };

  useEffect(() => {
    fetchApiPostById();
  }, [params.id]);

  return (
    <div
      className="card mb-3"
      style={{
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20px",
        border: "none",
      }}
    >
      <div
        className="card-body"
        style={{
          marginBottom: "20px",
          border: "1px solid #cecece",
          borderRadius: "10px",
        }}
      >
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
      </div>
      <Comment postId={post.id} body={""} />
    </div>
  );
};

export default PageSinglePost;
