import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import OrderEnum from "../enums/order-enum";
import ComicItem from "./comicItem";
import apiConfig from "../utils/apiConfig";

const CharacterDetailsPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterResult = await axios.get(
          apiConfig.baseUrl + `characters/${id}`,
          {
            params: apiConfig.defaultParams,
          }
        );

        setCharacter(characterResult.data.data.results[0]);
        const comicsResult = await axios.get(apiConfig.baseUrl + `comics`, {
          params: {
            ...apiConfig.defaultParams,
            limit: apiConfig.comicsLimit,
            orderBy: OrderEnum.ONSALEDATEDESC,
            characters: id,
          },
        });

        setComics(comicsResult.data.data.results);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  return (
    <>
      {!character ? (
        ""
      ) : (
        <>
          <div>
            <button className="back-button" onClick={goBack}>
              <FaArrowLeft className="back-icon" />
              Go Back
            </button>
          </div>
          <div className="box-content">
            <div className="right-box">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt=""
              />
            </div>
            <div className="left-box">
              <h1>{character.name}</h1>
              <h4>{character.description}</h4>
            </div>
          </div>

          <div className="comic-box-content">
            <h1 style={{ textAlign: "center" }}>Comics</h1>
            {comics.map((comic) => (
              <ComicItem key={comic.id} comic={comic} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CharacterDetailsPage;
