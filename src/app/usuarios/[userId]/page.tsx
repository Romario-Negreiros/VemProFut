"use client";

import { useState, useEffect, useContext } from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Modal from "@mui/material/Modal";
import ChangeUserName from "@/components/ChangeUserName";
import ChangeUserPassword from "@/components/ChangeUserPassword";
import ChangeUserFollowedTeams from "@/components/ChangeUserFollowedTeams";
import Message from "@/components/Message";

import userContext from "@/contexts/userContext";

import type { NextPage } from "next";
import type { User as IUser } from "@/contexts/userContext";
import type { Props as IMessage } from "@/components/Message";

interface Props {
  params: {
    userId: number;
  };
}

type Actions = "changeName" | "changePassword" | "changeFollowedTeams" | "";

interface IModal {
  isOpen: boolean;
  action: Actions;
}

const User: NextPage<Props> = ({ params: { userId } }) => {
  const { user, setUser } = useContext(userContext);
  const [modal, setModal] = useState<IModal>({ isOpen: false, action: "" });
  const [message, setMessage] = useState<IMessage | null>(null);

  const handleOpenModal = (action: Actions) => setModal({ isOpen: true, action });
  const handleCloseModal = () => setModal({ isOpen: false, action: "" });
  const jwt = document.cookie.substring(4);

  useEffect(() => {
    if (!user) {
      setMessage({
        msg: "Você precisa entrar para ter acesso a esta pagina.",
        link: {
          href: "/entrar",
          text: "ENTRAR",
        },
      });
      return;
    }
    if (user.id !== userId) {
      setMessage({
        msg: "Você não tem acesso a esta pagina.",
      });
      return;
    }
    if (!jwt || !document.cookie.search(/$[jwt=]{1}[a-z09.,-]*$/i)) {
      setMessage({
        msg: "Você precisa entrar para ter acesso a esta pagina.",
        link: {
          href: "/entrar",
          text: "ENTRAR",
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (message) {
    return <Message msg={message.msg} link={message.link} />;
  }
  return (
    <Container sx={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 64px)" }}>
      <ButtonGroup orientation="vertical">
        <Button onClick={() => handleOpenModal("changeName")}>Alterar nome</Button>
        <Button onClick={() => handleOpenModal("changePassword")}>Alterar senha</Button>
        <Button onClick={() => handleOpenModal("changeFollowedTeams")}>Alterar times que acompanha</Button>
      </ButtonGroup>
      <Modal open={modal.isOpen} onClose={handleCloseModal}>
        <>
          {modal.action === "changeName" && (
            <ChangeUserName user={user as IUser} setUser={setUser} jwt={jwt} handleCloseModal={handleCloseModal} />
          )}
          {modal.action === "changePassword" && (
            <ChangeUserPassword jwt={jwt} handleCloseModal={handleCloseModal} />
          )}
          {/* {modal.action === "changeFollowedTeams" && <ChangeUserFollowedTeams user={user as User} setUser={setUser} />} */}
        </>
      </Modal>
    </Container>
  );
};

export default User;
