import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import img from "./img/gg.gif";
function App() {
  const url = "https://fakestoreapi.com/products";
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  useEffect(() => {
    axios
    .get(url)
    .then((res) => setdata(res.data,data1))
    .catch((err) => console.log(err));
  }, []);

  const [search, setSearch] = useState("");
  const category = ["All", ...new Set(data.map((val) => val.category))];

  console.log(category);
  function fun(i) {
    console.log(category[i]);
    let filter = data.filter((val) => val.category === category[i]);
    if (i !== 0) {
      setdata1(filter);
    } else {
      setdata1(data);
    }
  }

  function deletfun(id) {
    setdata1(data1.filter((val) => val.id !== id));
  }
  console.log(data1);

  return (
    <div className="container-fluid">
      {data.length > 0 ? (
        <div className="box">
          <div className="flex">
            <input
              type="search"
              name="input"
              className="input"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            {category.map((val, i) => (
              <Button onClick={() => fun(i)} key={i} color="primary" outline>
                {val}
              </Button>
            ))}
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>price</th>
                <th>title</th>
                <th>image</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {data1
                .filter((item) =>
                  item.category
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
                .map((val, index) => (
                  <tr key={index}>
                    <th scope="row">{val.id}</th>
                    <td>{val.category}</td>
                    <td>{val.category.slice(0, 15)}</td>
                    <td>{val.rating.count}</td>
                    <td>{val.title.slice(0, 16)}</td>
                    <td>
                      {" "}
                      <img className="img" src={val.image} alt="img" />
                    </td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => deletfun(val.id)}
                        color="danger"
                        outline
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="div">
          <img className="img1" src={img} alt="Loading...." />
        </div>
      )}
    </div>
  );
}
export default App;
