import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Word from "../MyContext";
import styled from "styled-components";
import Play from "../assets/images/icon-play.svg";

export default function Dictionary() {
  const { value, setValue } = useContext(Word);
  const [post, setPost] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [value]);

  if (!post) return null;

  // Get phonetics form api.

  const phonetics = post[0].phonetics;
  const mp3Audios = phonetics;
  const usAudio = mp3Audios.filter((phoneticItem) =>
    phoneticItem.audio.endsWith("us.mp3")
  );

  let audioVariable;
  for (let i = 0; i < usAudio.length; i++) {
    audioVariable = usAudio[i].audio;
  }

  function playSound() {
    let stereo = new Audio(audioVariable);
    stereo.play();
  }

  const synonyms = post[0].meanings[0].synonyms;
  const newSynonyms = synonyms.join(", ");
  const noun = post[0].meanings[0].definitions;
  const definitions = post[0].meanings[0].definitions;
  const wikiLink = post[0].sourceUrls[0];

  const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-bottom: 18px;
    padding-left: 24px;
    width: auto;
    height: 69px;
  `;

  const WordP = styled.p`
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 0;
    font-family: ${({ theme }) => theme.fonts.interBold};
  `;

  const Phonetics = styled.p`
    color: ${({ theme }) => theme.colors.pink};
    height: fit-content;
  `;

  const PlayIcon = styled.div`
    position: relative;
    top: -83px;
    left: 80%;
    width: fit-content;
    img {
      width: 48px;
      height: 48px;
    }
  `;

  const SynonymDiv = styled.div`
    display: flex;
    padding-left: 24px;
    padding-right: 24px;
    gap: 26px;
  `;

  const Ul = styled.ul`
    padding-left: 24px;
    padding-right: 24px;
    width: auto;
    font-size: 15px;
    margin-top: 0;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.lightBlack};
  `;

  const Li = styled.li`
    list-style-type: none;
    &:before {
      content: "• ";
      color: ${({ theme }) => theme.colors.darkPink};
    }
  `;

  return (
    <>
      <MainDiv>
        <WordP>{value ? post[0].word : null}</WordP>
        <Phonetics>{value ? post[0].phonetic : null}</Phonetics>
        <PlayIcon>
          {value ? (
            <img
              style={{ cursor: "pointer" }}
              src={Play}
              onClick={() => {
                playSound();
              }}
            ></img>
          ) : null}
        </PlayIcon>
      </MainDiv>
      <ContentDiv>
        {value ? (
          <p
            style={{
              fontSize: 18,
              color: "black",
              width: 65,
              paddingLeft: 24,
              marginBottom: 15,
            }}
          >
            noun
            <SolidLine></SolidLine>
          </p>
        ) : null}

        {value ? (
          <p
            style={{
              fontSize: 16,
              color: "#757575",
              width: 65,
              height: 20,
              paddingLeft: 24,
            }}
          >
            Meaning
          </p>
        ) : null}

        {noun.map((item, index) => (
          <Ul key={index} style={{ marginTop: 30 }}>
            {value ? <Li>{item.definition}</Li> : null}
          </Ul>
        ))}
      </ContentDiv>
      <div>
        {value ? (
          <SynonymDiv>
            <p style={{ color: "#757575" }}>Synonyms</p>
            <p style={{ color: "#A445ED" }}>{newSynonyms}</p>
          </SynonymDiv>
        ) : null}
      </div>
      <ContentDiv>
        {value ? (
          <p
            style={{
              fontSize: 18,
              color: "black",
              width: 65,
              paddingLeft: 24,
              marginBottom: 15,
            }}
          >
            verb
            <SolidLine></SolidLine>
          </p>
        ) : null}

        {value ? (
          <p
            style={{
              fontSize: 16,
              color: "#757575",
              width: 65,
              height: 20,
              paddingLeft: 24,
            }}
          >
            Meaning
          </p>
        ) : null}
      </ContentDiv>
      {definitions.map((item, index) => (
        <Ul key={index} style={{ marginTop: 30 }}>
          {value ? <Li>{item.definition}</Li> : null}
        </Ul>
      ))}
      <BottomSolidLine />
      <div style={{ marginBottom: 84 }}>
        <p
          style={{
            fontSize: 16,
            color: "#757575",
            width: 65,
            height: 20,
            paddingLeft: 24,
            textDecoration: "underline",
          }}
        >
          Source
        </p>
        <a
          href={wikiLink}
          style={{
            paddingLeft: 24,
          }}
        >
          {wikiLink}
        </a>
      </div>
    </>
  );
}

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SolidLine = styled.div`
  position: relative;
  left: 60px;
  top: -10px;
  width: 266px;
  border-bottom: 1px solid #e9e9e9;
`;

const BottomSolidLine = styled(SolidLine)`
  margin-top: 32px;
  width: 327px;
  left: 24px;
`;
