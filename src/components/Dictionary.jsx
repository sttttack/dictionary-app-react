import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Word from "../MyContext";
import Dark from "../DarkContext";
import styled from "styled-components";
import Play from "../assets/images/icon-play.svg";
import Window from "../assets/images/icon-new-window.svg";

export default function Dictionary() {
  const { value, setValue } = useContext(Word);
  const [post, setPost] = useState(null);
  const { dark } = useContext(Dark);

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

  // Get Part Of Speech

  const verbsArray = post[0].meanings
    .filter((meaning) => meaning.partOfSpeech === "verb")
    .flatMap((meaning) => meaning.definitions);

  // Get Synonyms and Wikipedia

  const synonyms = post[0].meanings[0].synonyms;
  const newSynonyms = synonyms.join(", ");
  const noun = post[0].meanings[0].definitions;
  const wikiLink = post[0].sourceUrls[0];

  // Component styling

  const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-bottom: 18px;
    padding-left: 24px;
    width: auto;
    height: 69px;
    @media (min-width: 768px) {
      padding-left: 40px;
      padding-right: 40px;
    }
    @media (min-width: 1439px) {
      padding-left: 351px;
      padding-right: 351px;
    }
  `;

  const WordP = styled.p`
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 0;
    color: ${({ theme, dark }) =>
      dark ? theme.light.white : theme.dark.black};
  `;

  const Phonetics = styled.p`
    color: ${({ theme }) => theme.light.pink};
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
      &:hover {
        filter: brightness(2);
      }
    }

    @media (min-width: 768px) {
      left: 90%;
    }

    @media (min-width: 1024px) {
      left: 92%;
    }

    @media (min-width: 1439px) {
      left: 92.5%;
    }
  `;

  const SynonymDiv = styled.div`
    display: flex;
    padding-left: 24px;
    padding-right: 24px;
    gap: 26px;
    @media (min-width: 768px) {
      padding-left: 40px;
      padding-right: 40px;
    }
    @media (min-width: 1439px) {
      padding-left: 351px;
      padding-right: 351px;
    }
  `;

  const Ul = styled.ul`
    padding-left: 24px;
    padding-right: 24px;
    width: auto;
    font-size: 15px;
    margin-top: 0;
    margin-bottom: 0;
    color: ${({ theme }) => theme.light.lightBlack};
    @media (min-width: 768px) {
      padding-left: 40px;
      padding-right: 40px;
    }
    @media (min-width: 1439px) {
      padding-left: 351px;
      padding-right: 351px;
    }
  `;

  const Li = styled.li`
    list-style-type: none;
    &:before {
      content: "• ";
      color: ${({ theme }) => theme.light.darkPink};
    }
  `;

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
    @media (min-width: 768px) {
      width: 608px;
      left: 64px;
    }
    @media (min-width: 1439px) {
      width: 656px;
      left: 64px;
    }
  `;

  const BottomSolidLine = styled(SolidLine)`
    margin-top: 32px;
    width: 327px;
    left: 24px;
    @media (min-width: 768px) {
      left: 40px;
      width: 668px;
    }
    @media (min-width: 1439px) {
      left: 351px;
      width: 736px;
    }
  `;

  const CustomP = styled.p`
    font-size: 18px;
    color: ${({ theme, dark }) =>
      dark ? theme.light.white : theme.dark.black};
    width: 65px;
    padding-left: 24px;
    @media (min-width: 768px) {
      padding-left: 40px;
    }
    @media (min-width: 1439px) {
      padding-left: 351px;
      padding-right: 351px;
    }
  `;

  const CustomA = styled.div`
    padding-left: 24px;
    margin-bottom: 80px;
    @media (min-width: 768px) {
      padding-left: 40px;
      margin-bottom: 80px;
    }
    @media (min-width: 1439px) {
      padding-left: 351px;
      padding-right: 351px;
      margin-bottom: 124px;
    }
  `;

  const Example = styled.p`
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.light.gray};
  `;

  return (
    <>
      <MainDiv>
        <WordP dark={dark}>{value ? post[0].word : null}</WordP>
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
          <CustomP dark={dark} style={{ fontStyle: "Italic" }}>
            noun
            <SolidLine></SolidLine>
          </CustomP>
        ) : null}

        {value ? <CustomP dark={dark}>Meaning</CustomP> : null}

        {noun.map((item, index) => (
          <Ul
            key={index}
            style={{ marginTop: 30, color: !dark ? "black" : "white" }}
            dark={dark}
          >
            {value ? <Li>{item.definition}</Li> : null}
          </Ul>
        ))}
      </ContentDiv>
      <div>
        {value ? (
          <SynonymDiv>
            <p style={{ color: "#757575", fontStyle: "Italic" }}>Synonyms</p>
            <p style={{ color: "#A445ED" }}>{newSynonyms}</p>
          </SynonymDiv>
        ) : null}
      </div>

      {verbsArray.length > 0 && (
        <ContentDiv>
          {value ? (
            <CustomP dark={dark} style={{ fontStyle: "Italic" }}>
              verb
              <SolidLine></SolidLine>
            </CustomP>
          ) : null}
          {value ? <CustomP>Meaning</CustomP> : null}
          {verbsArray.length >= 1 && value
            ? verbsArray.map((item, index) => (
                <Ul
                  key={index}
                  style={{ marginTop: 30, color: !dark ? "black" : "white" }}
                >
                  <Li>{item.definition}</Li>
                  {item.example ? <Example>“{item.example}”</Example> : null}
                </Ul>
              ))
            : null}
        </ContentDiv>
      )}
      {value ? <BottomSolidLine /> : null}
      {value ? (
        <div>
          <CustomP style={{ color: !dark ? "black" : "white" }}>Source</CustomP>

          <CustomA>
            <a
              href={wikiLink}
              target="_blank"
              style={{ color: "#757575", cursor: "pointer" }}
            >
              {wikiLink}&nbsp;
              <img src={Window} />
            </a>
          </CustomA>
        </div>
      ) : null}
    </>
  );
}
