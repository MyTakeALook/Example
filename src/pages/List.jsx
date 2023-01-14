import React from "react";
import Layout from "../shared/Layout";
import { Link } from "react-router-dom";

const List = () => {
  //   const [cats, setCats] = useState(null);
  //   useEffect(() => {
  //     axios.get(`${process.env.REACT_APP_MUSIC}/lists`).then((response) => {
  //       setCats(response.data);
  //     });
  //   }, []);

  return (
    <Layout>
      <div>
        <Link to="/Detail">디테일로</Link>
      </div>
    </Layout>
  );
};

export default List;
