import { useState } from "react";
import CreatePostModal from "../../components/CreatePostModal";

const PagePostsDashboard = () => {
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);

  return (
    <div className="card mb-3">
      <img src="blog.jpg" className="card-img-top" alt="Blog" />
      <div className="card-body">
        <h5 className="card-title">Tde Finibus Bonorum et Malorum</h5>
        <p className="card-text">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
        <a
          href="/posts"
          className="btn btn-primary"
          style={{ marginRight: "15px" }}
        >
          View Posts
        </a>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setOpenModalCreatePost(true);
          }}
        >
          Create post
        </button>
        {openModalCreatePost && (
          <CreatePostModal setOpenModalCreatePost={setOpenModalCreatePost} />
        )}
      </div>
    </div>
  );
};

export default PagePostsDashboard;
