import { title } from "process";
import { FC, useEffect, useState } from "react";
import EditPostModal from "../../components/EditPostModal";

export interface Post {
  id: number;
  title: string;
  body: string;
}

const PagePosts: FC<Post> = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({} as Post);
  const [openModalEditPost, setOpenModalEditPost] = useState(false);

  const fetchApiPosts = async () => {
    const responce = await fetch("https://bloggy-api.herokuapp.com/posts").then(
      (responce) => responce.json()
    );

    setPosts(responce);
  };

  const fetchApiPostDelete = async (id: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
    };

    fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, requestOptions).then(
      () => fetchApiPosts()
    );
  };

  const setDataPost = (post: any) => {
    setPost(post);
    setOpenModalEditPost(true);
  };
  useEffect(() => {
    fetchApiPosts();
  }, []);

  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <div className="col-sm-6">
        <div className="card" style={{ border: "none" }}>
          {posts &&
            posts.map((post) => (
              <div
                className="card-body"
                style={{
                  margin: "10px",
                  border: "1px solid #cecece",
                  borderRadius: "5px",
                }}
              >
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 200)}...</p>
                <div
                  className="card-buttons"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <a href={`/posts/${post.id}`} className="btn btn-primary">
                    View Post
                  </a>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      setDataPost(post);
                    }}
                    style={{ margin: "0 10px" }}
                  >
                    Edit post
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => fetchApiPostDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {openModalEditPost && (
        <EditPostModal
          id={post.id}
          title={post.title}
          body={post.body}
          setOpenModalEditPost={setOpenModalEditPost}
          fetchApiPosts={() => fetchApiPosts()}
        />
      )}
    </div>
  );
};

export default PagePosts;
