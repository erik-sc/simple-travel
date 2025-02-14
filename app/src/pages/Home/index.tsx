import React, { useState, useEffect } from "react";
import { Button, Container, Icon, Stack, SvgIcon, Typography } from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Airplane from "../../components/Icons/Airplane";

const HomePage: React.FC = () => {
  const [title, setTitle] = useState("Plan your trip without headaches");
  const navigate = useNavigate();
  const titles = [
    "Plan your trip without headaches",
    "Planifica tu viaje sin dolores de cabeza",
    "Planifiez votre voyage sans maux de tête",
    "Planen Sie Ihre Reise ohne Kopfschmerzen",
    "Pianifica il tuo viaggio senza mal di testa",
    "Planeje sua viagem sem dores de cabeça",
    "頭痛なしで旅行を計画する",
    "无头痛地计划您的旅行",
    "두통 없이 여행을 계획하세요",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitle((prevTitle) => {
        const currentIndex = titles.indexOf(prevTitle);
        const nextIndex = (currentIndex + 1) % titles.length;
        return titles[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [titles]);


  return (
    <div className="home-main">
      <Container disableGutters className="home-main-container">
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={2}
        >
          <Airplane/>
        </Stack>
        <Stack alignItems={"center"} spacing={2}>
          <Typography variant="h3" key={title} className="animated-title">
            {title}
          </Typography>
          <Button size={"large"} variant="contained" onClick={() => navigate("/tripform")}>Get started!</Button>
        </Stack>
      </Container>
    </div>
  );
};

export default HomePage;