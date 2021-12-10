import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const [photoState, setPhotoState] = useState([]);
  const [isRenderd, setIsRendered] = useState(false);
  const uploadImage = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (photo) {
      const formData = new FormData();
      formData.append("photo", photo);
      await axios
        .post("http://localhost:5000/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {setIsRendered(true)})
        .catch((err) => {
          console.log(err, "error occured");
        });
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/getFile")
      .then((res) => {
        setPhotoState(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [isRenderd]);

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={onFormSubmit}>
        <div class="form-group">
          <label for="exampleInputPassword1">File</label>
          <input
            type="file"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="select file"
            onChange={uploadImage}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        {photoState.length > 0 &&
          photoState.map((data, i) => (
            <div key={i} className="imgDiv">
              <img
                className="image"
                src={`http://localhost:5000/getFile/${data._id}`}
                alt="img"
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
