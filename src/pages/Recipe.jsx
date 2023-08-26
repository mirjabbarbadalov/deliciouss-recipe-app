import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import apiKey from "../../.api-key";

function Recipe() {
  let params = useParams();

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  return (
    <DetailWrapper>
      <div className="img-sec">
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients &&
              details.extendedIngredients.length > 0 &&
              details.extendedIngredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.aisle}</li>;
              })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 4rem;

  /* .img-sec {
    width: 100%;

    img {
      width: 40rem;
    }
  } */

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
  }

  li {
    font-size: 1.8rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: bold;
`;

const Info = styled.div`
  margin-left: 3rem;
`;

export default Recipe;
